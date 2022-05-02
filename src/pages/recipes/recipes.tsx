import React, {useContext, useState} from "react";
import {Button, Grid, Modal, TextField} from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import { Box } from '@mui/system';
import ModalText from "./ModalText";
import RecipeApi from "../../api/spoonacularApi";
import { getDatabase, ref, onValue, off, set} from "firebase/database";
import UserContext from "../../context/user-context";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}



type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: string, directionRes: string[], ingredientRes: string[] }
type SaveRecipeType = {id: string, list: string}

export default function Recipes() {

  const [filterString, setFilterString] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);
  const {user} = useContext(UserContext);
  const [saveRecipeList, setSaveRecipeList] = useState<string[]>([])
  
  const db = getDatabase();
  const starCountRef = ref(db, 'users/' + (user ? user.username : ""));

  const removeOrAddIdFromList = (id:string, type:any) => {
    if (saveRecipeList.includes(id)){
      setSaveRecipeList(saveRecipeList.filter((x:string) => {return x !== id}))
    } else {
      const test = ref(db, 'users/' + (user ? user.username : "")+'/list/'+id);
      set(test, type)
      
    }

  }

  console.log(saveRecipeList)

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data.list);
        setSaveRecipeList(keys)
        off(starCountRef)
    });


    // const newList = testRecipe.filter(y => y.name.toUpperCase().includes(filterString.toUpperCase()));
    // console.log(newList);
    const spoonacularList: Recipe[] = [];
    RecipeApi.getRecipeFromString(filterString, 10).then(result => {
      result.results.forEach((element: any) => {
        const listOfSteps: string[] = [];
        const listOfIngre: string[] = [];


        element.analyzedInstructions[0].steps.forEach((step: any) => {
          listOfSteps.push(step.step)
          step.ingredients.forEach((ingredientInStep: any) => {
            if (!listOfIngre.includes(ingredientInStep.name)){
              listOfIngre.push(ingredientInStep.name)
            }
          })
        })
          // console.log(listOfIngre)
          spoonacularList.push({"name": element.title, "imageString": element.image, "rank": 3, skill: "easy", "time": element.readyInMinutes, "id": element.id, "directionRes": listOfSteps, "ingredientRes": listOfIngre})
          // console.log(element)
      });
      setListOfRecipes(spoonacularList);
    })
  }

  return (
    <>
      <Modal
        open={selectedRecipe !== null}
        onClose={() => setSelectedRecipe(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        
        <div style={{width: "800px", height: "80%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
          <ModalText 
            removeOrAddIdToList={ removeOrAddIdFromList}
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
          {console.log(selectedRecipe)}
        </div>

      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} display={{xs: "none", sm: "initial"}}>
          <h1 style={{paddingLeft: "16px", marginBottom: "0"}}>Recipes</h1>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box component="form" onSubmit={handleSearch} sx={{pt: 2, pr: 2, pb: 1, pl: 2}}>
            <TextField fullWidth type="text" value={filterString}
                       onChange={x => setFilterString(x.target.value)} label="Search for a recipe name"
                       variant="outlined"
                       InputProps={{
                         endAdornment: <Button type="submit" variant="outlined" sx={{
                           backgroundColor: "white",
                           color: "#FD8270",
                           ':hover': {backgroundColor: '#FD8270', color: "white", transition: '0.5s'}
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
    </>
  )
}
