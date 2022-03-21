import './recipes.css';
import { Component } from "react";
import { Checkbox, FormControlLabel, FormGroup, Grid, Modal, TextField, Typography } from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";
import { Box } from '@mui/system';
import { ModalText } from './ModalText';

type recipeState = {
  filterString: string,
  typeFilter: string,
  selectedRecipe: any;
}

const typeOfFood = ["Paste", "Pizza", "Salad", "Wok", "Soup", "Other"]

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
    })
  }

  render() {
    const { filterString, typeFilter, selectedRecipe } = this.state;
    console.log(selectedRecipe)
    return <div className="recipy_wrapper">

      <Modal
        open={selectedRecipe !== undefined}
        onClose={() => this.setState({selectedRecipe: undefined})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {ModalText()}
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
            }} label="Search for a recipe name" variant="outlined" />
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={4} md={3} lg={3}>
          <div className="recipy_filter_wrapper">
            <b>Filter</b>
            <hr />
            <FormGroup>
              {typeOfFood.map(object => {
                const key = object;
                return <FormControlLabel key={object} onChange={() => {
                  if (!typeFilter.includes(object)) {
                    this.setState({ typeFilter: typeFilter + key + ", " })
                  } else {
                    this.setState({ typeFilter: typeFilter.replace(key + ", ", "") })
                  }
                }} control={<Checkbox checked={!typeFilter.includes(object)} />} label={object} />
              })}
            </FormGroup>
          </div>
        </Grid>
        <Grid item xs={8} md={9} lg={9}>
          <Grid container spacing={2} style={{ marginTop: "0px", paddingLeft: "10px" }}>
            {testRecipe.filter(y => (y.name.toUpperCase().includes(filterString.toUpperCase()) && !typeFilter.toUpperCase().includes(y.type.toUpperCase()))).map(x => {
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
}
