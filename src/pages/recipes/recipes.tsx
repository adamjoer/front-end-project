import React, {useState} from "react";
import {Button, Grid, Modal, TextField} from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import { Box } from '@mui/system';
import ModalText from "./ModalText";

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

type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: number }

const testRecipe: Recipe[] = [
  {
    name: "Pizza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    id: 0
  },
  {
    name: "Soup",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    id: 1
  },
  {
    name: "Pizzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    id: 2
  },
  {
    name: "Soupsss",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    id: 3
  },
  {
    name: "Fish N Chips",
    imageString: "https://madfilosofie.dk/wp-content/uploads/2019/03/fish-n-chips13.jpg",
    rank: 4.26,
    skill: "Easy",
    time: 35,
    id: 9
  },
  {
    name: "Pizzzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    id: 4
  },
  {
    name: "Soupss",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    id: 5
  },
  {
    name: "Pizzzzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    id: 6
  },
  {
    name: "Soups",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    id: 7
  },
  {
    name: "Fish N Chips",
    imageString: "https://madfilosofie.dk/wp-content/uploads/2019/03/fish-n-chips13.jpg",
    rank: 4.26,
    skill: "Easy",
    time: 35,
    id: 8
  }
]

export default function Recipes() {

  const [filterString, setFilterString] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const newList = testRecipe.filter(y => y.name.toUpperCase().includes(filterString.toUpperCase()));
    console.log(newList);

    setListOfRecipes(newList);
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
          <ModalText titleString={"hey"} imageString={"https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg"} rank={3} skill={"easy"} time={420} />
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
