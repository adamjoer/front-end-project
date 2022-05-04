import "./lists.css"
import React, {ChangeEvent, useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import ActionAreaCard from "../../components/recipecard/card";
import {getDatabase, off, onValue, ref, set} from "firebase/database";
import RecipeApi from "../../api/spoonacularApi";
import ModalText from "../recipes/ModalText";
import {getAuth} from "firebase/auth";

type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: number, directionRes: string[], ingredientRes: string[], list: string }
type List = { name: string, recipes: Recipe[] }

export default function Lists() {

  const [filterString, setFilterString] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);
  const [saveRecipeList, setSaveRecipeList] = useState<string[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [listFilters, setListFilters] = useState<{ [key: string]: boolean }>({});
  const [isLoadingAnimationEnabled, setLoadingAnimationEnabled] = useState(false);

  const handleFilterStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value);
  }

  const handleListFilterChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setListFilters(
      prevState => (
        {
          ...prevState,
          [event.target.name]: checked
        }
      )
    );
  }

  const auth = getAuth();

  const db = getDatabase();
  const starCountRef = ref(db, 'users/' + (auth.currentUser ? auth.currentUser.uid : ""));
  const removeOrAddIdFromList = (id: string, listName: string | null) => {
    if (listName !== null)
      listName = listName.toLowerCase()

    const test = ref(db, 'users/' + (auth.currentUser ? auth.currentUser.uid : "") + '/list/' + id);
    set(test, listName);

    if (!listName) {
      setListOfRecipes(listOfRecipes.filter(recipe => recipe.id.toString() !== id));
      let listToRemove: string | null = null;
      for (let i = 0; i  < lists.length; ++i) {
        const list = lists[i];

        const recipe = list.recipes.find((recipe) => recipe.id.toString() === id);
        if (recipe) {
          const index = list.recipes.indexOf(recipe);
          list.recipes.splice(index, 1);
          if (list.recipes.length === 0) {
            listToRemove = list.name;
          }
          break;
        }
      }

      if (listToRemove !== null)
        setLists(lists.filter((list) => list.name !== listToRemove));
    }
  }

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (!data.list)
        return;

      const keys: string[] = Object.keys(data.list);
      setSaveRecipeList(keys);

      const paramString = keys.reduce(
        (previousValue, currentValue, currentIndex) => {
          if (currentIndex === 0)
            return currentValue.toString();
          else
            return `${previousValue},${currentValue}`
        },
        ""
      );
      off(starCountRef)

      setLoadingAnimationEnabled(true);

      RecipeApi.getRecipesFromIdBulk(paramString)
        .then(result => {
            const spoonacularList: Recipe[] = [];
            result.forEach((element: any) => {
              const listOfSteps: string[] = [];
              const listOfIngredients: string[] = [];
              if (element.analyzedInstructions.length > 0) {
                element.analyzedInstructions[0].steps.forEach((step: any) => {
                  listOfSteps.push(step.step)
                  step.ingredients.forEach((ingredientInStep: any) => {
                    if (!listOfIngredients.includes(ingredientInStep.name)) {
                      listOfIngredients.push(ingredientInStep.name)
                    }
                  })
                })
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
                list: data.list[element.id],
              })
            });

            let temporaryLists: List[] = [];

            spoonacularList.forEach((recipe) => {
              const list = temporaryLists.find((list) => list.name === recipe.list);
              if (list) {
                list.recipes.push(recipe);

              } else {
                temporaryLists.push({
                  name: recipe.list,
                  recipes: [recipe],
                })
              }
            });

            const listNames = temporaryLists.map(list => list.name);

            setListFilters(
              listNames.reduce(
                (listOptions, listOption) => (
                  {
                    ...listOptions,
                    [listOption]: true
                  }
                ),
                {}
              )
            );

            temporaryLists.sort((a, b) => a.name.localeCompare(b.name));
            setLists(temporaryLists);
          },
          reason => console.error(reason)
        )

        .finally(() => {
            setLoadingAnimationEnabled(false);
          }
        )
    });

  }, [null]);

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
          {selectedRecipe && saveRecipeList &&
              <ModalText
                  removeOrAddIdToList={removeOrAddIdFromList}
                  saveRecipeList={saveRecipeList}
                  titleString={selectedRecipe.name}
                  imageString={selectedRecipe.imageString}
                  rank={selectedRecipe.rank}
                  skill={selectedRecipe.skill}
                  id={selectedRecipe.id.toString()}
                  time={selectedRecipe.time}
                  directionRes={selectedRecipe.directionRes}
                  ingredientRes={selectedRecipe.ingredientRes}
              />}
        </div>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} lg={3} display={{xs: "none", sm: "initial"}}>
          <h1 id="main-header">Lists</h1>
        </Grid>
        <Grid item xs={12} sm={9} lg={9}>
          <Box component="form" sx={{pt: 2, pr: 2, pb: 1, pl: 2}}>
            <TextField onChange={handleFilterStringChange} fullWidth label="Search for a recipe name"
                       variant="outlined" autoComplete="off"/>
          </Box>
        </Grid>
      </Grid>

      <hr/>

      <Grid container>
        <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2} sx={{pl: 2}}>
          <Box component="aside" sx={{position: {xs: "static", sm: "sticky"}, top: "86px"}}>
            <u><h3 id="filter-header">Filter</h3></u>
            <FormGroup>
              {lists.map((list) => list.name).map((listName) => (
                <FormControlLabel key={listName} label={listName}
                                  control={<Checkbox name={listName} checked={listFilters[listName]}
                                                     onChange={handleListFilterChange}/>}/>
              ))}
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={12} display={{xs: "initial", sm: "none"}}>
          <hr/>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={9.6} xl={10}>
          {lists.filter((list) => listFilters[list.name]).map((list) => (
            <Box key={list.name} component="div" sx={{mt: 1, pr: 2, pl: 2}}>
              <h2 className="list-header">{list.name}</h2>
              <Grid container spacing={2} sx={{pt: 1, pb: 2}}>
                {list.recipes.filter(recipe => recipe.name.toUpperCase().includes(filterString.toUpperCase())).map((recipe) => (
                  <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                    <ActionAreaCard imageString={recipe.imageString} titleString={recipe.name} rank={recipe.rank}
                                    skill={recipe.skill} time={recipe.time} selectFunc={() => setSelectedRecipe(recipe)}/>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  )
}
