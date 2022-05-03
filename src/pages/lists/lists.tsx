import "./lists.css"
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Grid,
  Box,
  Modal,
  Backdrop,
  CircularProgress
} from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import UserContext from "../../context/user-context";
import {getDatabase, off, onValue, ref, set} from "firebase/database";
import RecipeApi from "../../api/spoonacularApi";
import ModalText from "../recipes/ModalText";

type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: string, directionRes: string[], ingredientRes: string[], groupe: string }


export default function Lists() {

  const [filterString, setFilterString] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);
  const [saveRecipeList, setSaveRecipeList] = useState<string[]>([]);
  const [listOfMenuTypes, setListOfMenuTypes] = useState<string[]>([]);
  const [listFilters, setListFilters] = useState<string[]>([])
  const [update, setUpdate] = useState(false);
  const [onlyOnce, setOnlyOnce] = useState(false);
  const {user} = useContext(UserContext);

  const [isLoadingAnimationEnabled, setLoadingAnimationEnabled] = useState(false);

  const db = getDatabase();
  const starCountRef = ref(db, 'users/' + (user ? user.username : ""));
  const removeOrAddIdFromList = (id: string, type: any) => {
    const test = ref(db, 'users/' + (user ? user.username : "") + '/list/' + id);
    set(test, type); //Setting data in data.

  }
  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys: string[] = Object.keys(data.list);
      const listOfMenuTypes_opdate: string[] = [];
      setSaveRecipeList(keys);
      var paramString = "";
      for (var i = 0; i < keys.length; i++) {
        if (i === 0) {
          paramString = keys[i]
        } else {
          paramString = paramString + "," + keys[i]
        }
      }
      off(starCountRef)

      setLoadingAnimationEnabled(true);

      RecipeApi.getRecipesFromIdBulk(paramString).then((result: any) => {
        const spoonacularList: Recipe[] = [];
        result.forEach((element: any) => {
          const listOfSteps: string[] = [];
          const listOfIngre: string[] = [];
          if (element.analyzedInstructions.length > 0) {
            element.analyzedInstructions[0].steps.forEach((step: any) => {
              listOfSteps.push(step.step)
              step.ingredients.forEach((ingredientInStep: any) => {
                if (!listOfIngre.includes(ingredientInStep.name)) {
                  listOfIngre.push(ingredientInStep.name)
                }
              })
            })
          }
          spoonacularList.push({
            "name": element.title,
            "imageString": element.image,
            "rank": 3,
            skill: "easy",
            "time": element.readyInMinutes,
            "id": element.id,
            "directionRes": listOfSteps,
            "ingredientRes": listOfIngre,
            "groupe": data.list[element.id]
          })
          if (!listOfMenuTypes_opdate.includes(data.list[element.id])) {
            listOfMenuTypes_opdate.push(data.list[element.id]);
            listFilters.push(data.list[element.id])
          }
        });
        setListOfMenuTypes(listOfMenuTypes_opdate);
        setListOfRecipes(spoonacularList)

        setLoadingAnimationEnabled(false);
      })
    });

  }, [onlyOnce])

  const handleFilterListChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (listFilters.includes(event.target.name)) {
      setListFilters(listFilters.filter(list => list !== event.target.name))

    } else {
      listFilters.push(event.target.name)
      setUpdate(!update)
    }
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
          <ModalText
            removeOrAddIdToList={removeOrAddIdFromList}
            saveRecipeList={saveRecipeList ? saveRecipeList : [""]}
            titleString={selectedRecipe ? selectedRecipe.name : ""}
            imageString={selectedRecipe ? selectedRecipe.imageString : ""}
            rank={selectedRecipe ? selectedRecipe.rank : 0}
            skill={selectedRecipe ? selectedRecipe.skill : ""}
            id={selectedRecipe ? selectedRecipe.id : "0"}
            time={selectedRecipe ? selectedRecipe.time : 0}
            directionRes={selectedRecipe ? selectedRecipe.directionRes : [""]}
            ingredientRes={selectedRecipe ? selectedRecipe.ingredientRes : [""]}
          />
        </div>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} display={{xs: "none", sm: "initial"}}>
          <h1 style={{paddingLeft: "16px", marginBottom: "0"}}>Recipes</h1>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box component="form" sx={{pt: 2, pr: 2, pb: 1, pl: 2}}>
            <TextField fullWidth type="text" value={filterString}
                       onChange={(x: any) => setFilterString(x.target.value)} label="Search for a recipe name"
                       variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={1} sm={3} sx={{pl: 2}}>
          <Box component="aside" sx={{position: {xs: "static", sm: "sticky"}, top: "86px"}}>
            <u><h3 id="filter-header">Filter</h3></u>
            <FormGroup>
              {listOfMenuTypes.map((listName) => (
                <FormControlLabel key={listName} label={listName}
                                  control={<Checkbox name={listName} checked={listFilters.includes(listName)}
                                                     onChange={handleFilterListChange}/>}/>
              ))}
            </FormGroup>
          </Box>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={9} sx={{pt: 1, pl: 2, pb: 2, pr: 2}}>
          {listOfRecipes.filter(x1 => x1.name.toLowerCase().includes(filterString.toLowerCase()))
            .filter(x2 => listFilters.includes(x2.groupe))
            .map(x => (
              <Grid key={x.id} item xs={12} sm={4} md={3} lg={2.4} xl={2}>
                <ActionAreaCard imageString={x.imageString} titleString={x.name} rank={x.rank} skill={x.skill}
                                time={x.time} selectFunc={() => setSelectedRecipe(x)}/>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  )
}
