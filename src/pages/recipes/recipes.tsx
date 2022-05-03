import React, {useRef, useState} from "react";
import {Backdrop, Button, CircularProgress, Grid, Modal, TextField} from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import {Box} from '@mui/system';
import ModalText from "./ModalText";
import RecipeApi from "../../api/spoonacularApi";
import {getDatabase, off, onValue, ref, set} from "firebase/database";
import {getAuth} from "firebase/auth";

type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: string, directionRes: string[], ingredientRes: string[] }

export default function Recipes() {

  const auth = getAuth();

  const searchQuery = useRef("");
  const offset = useRef(0);
  const totalResults = useRef(0);

  const [filterString, setFilterString] = useState("");
  const [isLoadingAnimationEnabled, setLoadingAnimationEnabled] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);
  const [saveRecipeList, setSaveRecipeList] = useState<string[]>([])

  const db = getDatabase();
  const starCountRef = ref(db, `users/${auth.currentUser && auth.currentUser.uid}`);

  const removeOrAddIdFromList = (id: string, listName: string | null) => {
    const test = ref(db, `users/${auth.currentUser && auth.currentUser.uid}/list/${id}`);
    set(test, listName);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = data.list ? Object.keys(data.list) : [];
      setSaveRecipeList(keys)
      off(starCountRef)
    });
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (filterString.length === 0 || filterString === searchQuery.current)
      return;

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = data.list ? Object.keys(data.list) : [];
      setSaveRecipeList(keys);
      off(starCountRef);
    });

    offset.current = 0;
    searchQuery.current = filterString;

    setLoadingAnimationEnabled(true);

    RecipeApi.getRecipeFromString(searchQuery.current, 10, 0).then(result => {
        const spoonacularList = getDataFromJson(result);

        setListOfRecipes(spoonacularList);
        totalResults.current = result.totalResults;

        setLoadingAnimationEnabled(false);
      },
      (reason) => console.error(reason)
    );
  }

  const handleLoadMore = () => {

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = data.list ? Object.keys(data.list) : [];
      setSaveRecipeList(keys);
      off(starCountRef);
    });

    offset.current = offset.current + 10;

    setLoadingAnimationEnabled(true);

    RecipeApi.getRecipeFromString(searchQuery.current, 10, offset.current).then(result => {
        const spoonacularList = getDataFromJson(result);

        setListOfRecipes(prevState => prevState.concat(spoonacularList));
        totalResults.current = result.totalResults;

        setLoadingAnimationEnabled(false);
      },
      (reason) => console.error(reason)
    );
  }

  const getDataFromJson = (result: any): Recipe[] => {
    const spoonacularList: Recipe[] = [];

    result.results.forEach((element: any) => {
      const listOfSteps: string[] = [];
      const listOfIngredients: string[] = [];

      if (element.analyzedInstructions.length > 0) {
        element.analyzedInstructions[0].steps.forEach((step: any) => {
          listOfSteps.push(step.step);
          step.ingredients.forEach((ingredientInStep: any) => {
            if (!listOfIngredients.includes(ingredientInStep.name)) {
              listOfIngredients.push(ingredientInStep.name)
            }
          });
        });
      }

      spoonacularList.push({
        name: element.title,
        imageString: element.image,
        rank: 3,
        skill: "easy",
        time: element.readyInMinutes,
        id: element.id,
        directionRes: listOfSteps,
        ingredientRes: listOfIngredients,
      });
    });

    return spoonacularList;
  }
  
  return (
    <>
      <Backdrop open={isLoadingAnimationEnabled} onClick={() => setLoadingAnimationEnabled(false)}
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <CircularProgress color="secondary"/>
      </Backdrop>

      <Modal
        open={selectedRecipe !== null}
        onClose={() => setSelectedRecipe(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div style={{
          width: "800px",
          height: "80%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          {
            selectedRecipe &&
              <ModalText
                  removeOrAddIdToList={removeOrAddIdFromList}
                  saveRecipeList={saveRecipeList}
                  titleString={selectedRecipe.name}
                  imageString={selectedRecipe.imageString}
                  rank={selectedRecipe.rank}
                  skill={selectedRecipe.skill}
                  id={selectedRecipe.id}
                  time={selectedRecipe.time}
                  directionRes={selectedRecipe.directionRes}
                  ingredientRes={selectedRecipe.ingredientRes}
              />
          }
        </div>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} display={{xs: "none", sm: "initial"}}>
          <h1 style={{paddingLeft: "16px", marginBottom: "0"}}>Recipes</h1>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box component="form" onSubmit={handleSearch} sx={{pt: 2, pr: 2, pb: 1, pl: 2}}>
            <TextField fullWidth type="text" value={filterString}
                       onChange={event => setFilterString(event.target.value)} label="Search for a recipe name"
                       variant="outlined"
                       InputProps={{
                         endAdornment: <Button type="submit" variant="outlined" sx={{
                           backgroundColor: "white",
                           color: (theme) => theme.palette.secondary.main,
                           ':hover': {
                             backgroundColor: (theme) => theme.palette.secondary.main,
                             color: "white",
                             transition: '0.5s'
                           }
                         }}>Search</Button>
                       }}
            />
          </Box>
        </Grid>
      </Grid>

      <hr/>

      <Grid container spacing={2} sx={{pt: 1, pl: 2, pb: 2, pr: 2}}>
        {listOfRecipes.map(x => (
          <Grid key={x.id} item xs={12} sm={4} md={3} lg={2.4} xl={2}>
            <ActionAreaCard imageString={x.imageString} titleString={x.name} rank={x.rank} skill={x.skill}
                            time={x.time} selectFunc={() => setSelectedRecipe(x)}/>
          </Grid>
        ))}
      </Grid>

      {
        listOfRecipes.length < totalResults.current &&
          <Box display="flex" flexDirection="column" alignItems="center" sx={{pb: 2}}>
              <Button variant="contained" onClick={handleLoadMore}>
                  Load more ({listOfRecipes.length}/{totalResults.current})
              </Button>
          </Box>
      }
    </>
  )
}
