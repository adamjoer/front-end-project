import './recipes.css';
import { Component } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, TextField, Typography } from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import { Box } from '@mui/system';
import { ModalText } from './ModalText';

type recipeState = {
  filterString: string,
  typeFilter: string,
  selectedRecipe: any;
  listOfRecipies: {name: string, imageString: string, rank: number, skill: string, time: number, type: string, id: string}[],
}

const typeOfFood = ["Paste", "Pizza", "Salad", "Wok", "Soup", "Other"]


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
  p: 4,
  overflow: "scroll"
}



const testRecipe = [
  {
    name: "Pizza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    type: "Pizza",
    id: "0"
  },
  {
    name: "Soup",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    type: "Soup",
    id: "1"
  },
  {
    name: "Pizzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    type: "Pizza",
    id: "2"
  },
  {
    name: "Soupsss",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    type: "Soup",
    id: "3"
  },
  {
    name: "Fish N Chips",
    imageString: "https://madfilosofie.dk/wp-content/uploads/2019/03/fish-n-chips13.jpg",
    rank: 4.26,
    skill: "Easy",
    time: 35,
    type: "Other",
    id: "9"
  },
  {
    name: "Pizzzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    type: "Pizza",
    id: "4"
  },
  {
    name: "Soupss",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    type: "Soup",
    id: "5"
  },
  {
    name: "Pizzzzza",
    imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
    rank: 1.1,
    skill: "Easy",
    time: 65,
    type: "Pizza",
    id: "6"
  },
  {
    name: "Soups",
    imageString: "https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg",
    rank: 2.76,
    skill: "Easy",
    time: 25,
    type: "Soup",
    id: "7"
  },
  {
    name: "Fish N Chips",
    imageString: "https://madfilosofie.dk/wp-content/uploads/2019/03/fish-n-chips13.jpg",
    rank: 4.26,
    skill: "Easy",
    time: 35,
    type: "Other",
    id: "8"
  }
]

export class Recipes extends Component<{}, recipeState> {
  componentWillMount() {
    this.setState({
      filterString: "",
      typeFilter: "",
      selectedRecipe: undefined,
      listOfRecipies: [],
    })
  }

  render() {
    const { filterString, typeFilter, selectedRecipe, listOfRecipies } = this.state;
    console.log(selectedRecipe)
    return <div className="recipy_wrapper">

      <Modal
        open={selectedRecipe !== undefined}
        onClose={() => this.setState({ selectedRecipe: undefined })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalText titleString={"hey"} imageString={"image"} rank={3} skill={"easy"} time={420} />

        </Box>
      </Modal>
      <Grid container spacing={2}>
        <Grid item xs={4} md={3} lg={3}>
          <div className="recipy_filter_wrapper">
            <h1>Recipes</h1>
          </div>
        </Grid>
        <Grid item xs={8} md={9} lg={9}>
          <div style={{ padding: "20px 15px 0px 0px" }}>

            <TextField fullWidth id="outlined-basic" value={filterString} onChange={x => {
              this.setState({ filterString: x.target.value })
            }} label="Search for a recipe name" variant="outlined"
              InputProps={{ endAdornment: <Button onClick={() => this.handleSearch()} variant="outlined">Search</Button> }}
            />


          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Grid container spacing={2} style={{ marginTop: "0px", paddingLeft: "10px" }}>
            {listOfRecipies.map(x => {
              return <Grid key={x.id} item xs={4} md={3} lg={3}>
                <ActionAreaCard imageString={x.imageString} titleString={x.name} rank={x.rank} skill={x.skill}
                  time={x.time} selectFunc={() => { this.setState({ selectedRecipe: x }) }} />
              </Grid>
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  }

  handleSearch(){
    const newList = testRecipe.filter(y => y.name.toUpperCase().includes(this.state.filterString.toUpperCase()))
    console.log(newList)


    this.setState({listOfRecipies: newList})

  }
}

