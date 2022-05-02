import "./lists.css"
import React, {ChangeEvent, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, TextField, Grid, Box} from "@mui/material";
import ActionAreaCard from "../../components/recipecard/card";

type Recipe = { name: string, imageString: string, rank: number, skill: string, time: number, id: number }
type List = { name: string, recipes: Recipe[], id: number }

const dummyData: List[] = [
  {
    name: "Breakfast",
    recipes: [
      {
        name: "Oatmeal",
        imageString: "https://skinnyfitalicious.com/wp-content/uploads/2017/12/protein-oatmeal-img3-733x1100.jpg",
        rank: 2.1,
        skill: "Easy",
        time: 15,
        id: 0
      },
      {
        name: "Scrambled Eggs",
        imageString: "https://cd334822a6c8931fc94e2436473c553e.s3.us-west-2.amazonaws.com/images/1578961936_91mJa2%2BcURL.jpg",
        rank: 2.94,
        skill: "Medium",
        time: 25,
        id: 1
      },
      {
        name: "Corn Flakes",
        imageString: "https://vaya.in/recipes/wp-content/uploads/2018/05/Corn-Flakes.jpg",
        rank: 1.3,
        skill: "Easy",
        time: 5,
        id: 2
      },
      {
        name: "Toast",
        imageString: "https://www.simplyrecipes.com/thmb/lEb_Dr_2M6tdkdZ6YqYAiF6dfPw=/1800x1200/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__01__cinnamon-toast-horiz-a-1800-5cb4bf76bb254da796a137885af8cb09.jpg",
        rank: 2.4,
        skill: "Hard",
        time: 50,
        id: 3
      },
      {
        name: "Yogurt",
        imageString: "http://www.theorganicdietitian.com/wp-content/uploads/2015/08/Cococnut-Yogurt.jpg",
        rank: 4.2,
        skill: "Medium",
        time: 15,
        id: 4
      }
    ],
    id: 0
  },
  {
    name: "Lunch",
    recipes: [
      {
        name: "Sandwich",
        imageString: "https://i.ytimg.com/vi/Pq4E1BlPFHw/maxresdefault.jpg",
        rank: 3.2,
        skill: "Easy",
        time: 30,
        id: 5
      },
      {
        name: "Salad",
        imageString: "http://www.crazyvegankitchen.com/wp-content/uploads/2016/08/Vegan-Roasted-Vegetable-Salad-with-Avocado-Dressing-5.jpg",
        rank: 1.3,
        skill: "Medium",
        time: 25,
        id: 6
      },
      {
        name: "Soup",
        imageString: "https://toriavey.com/images/2013/12/Okra-Soup.jpg",
        rank: 1.2,
        skill: "Easy",
        time: 60,
        id: 7
      },
      {
        name: "Fish N Chips",
        imageString: "https://madfilosofie.dk/wp-content/uploads/2019/03/fish-n-chips13.jpg",
        rank: 4.26,
        skill: "Easy",
        time: 35,
        id: 9
      },
    ],
    id: 1
  },
  {
    name: "Dinner",
    recipes: [
      {
        name: "Pizza",
        imageString: "https://img.mummum.dk/wp-content/uploads/2020/09/pizza-med-pepperoni-.jpg",
        rank: 1.1,
        skill: "Easy",
        time: 65,
        id: 8
      },
      {
        name: "Sushi",
        imageString: "http://mannersandmischief.com/wp-content/uploads/2014/11/maki-sushi.jpg",
        rank: 4.5,
        skill: "Hard",
        time: 45,
        id: 9
      },
      {
        name: "Steak",
        imageString: "https://149410494.v2.pressablecdn.com/wp-content/uploads/2020/03/beef-steak-tomahawk-S3JHQLN.jpg",
        rank: 4.6,
        skill: "Medium",
        time: 35,
        id: 10
      },
      {
        name: "Lasagna",
        imageString: "https://restaurantetortelli.com/wp-content/uploads/2020/07/Lasagna-Mixta.jpg",
        rank: 2.3,
        skill: "Medium",
        time: 120,
        id: 11
      },
      {
        name: "Roast Chicken",
        imageString: "http://www.simplysated.com/wp-content/uploads/2015/09/2-roast-chicken-25-P9150025.jpg",
        rank: 1.4,
        skill: "Easy",
        time: 90,
        id: 12
      },
      {
        name: "Grilled Salmon",
        imageString: "https://allrecipesblog.com/wp-content/uploads/2016/08/Grilled-Salmon.jpg",
        rank: 2.3,
        skill: "Medium",
        time: 30,
        id: 13,
      }
    ],
    id: 2
  }
]

export default function Lists() {

  const listNames = dummyData.map(list => list.name);

  const [filterString, setFilterString] = useState("");

  const [listFilters, setListFilters] = useState<{ [key: string]: boolean }>(
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1} sm={3} lg={3} display={{xs: "none", sm: "initial"}}>
          <h1 id="main-header">Lists</h1>
        </Grid>
        <Grid item xs={12} sm={9} lg={9}>
          <Box component="form" sx={{pt: 2, pr: 2, pb: 1, pl: 2}}>
            <TextField onChange={handleFilterStringChange} fullWidth label="Search for a recipe name"
                       variant="outlined"/>
          </Box>
        </Grid>
      </Grid>

      <hr/>

      <Grid container>
        <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2} sx={{pl: 2}}>
          <Box component="aside" sx={{position: {xs: "static", sm: "sticky"}, top: "86px"}}>
            <u><h3 id="filter-header">Filter</h3></u>
            <FormGroup>
              {listNames.map((listName) => (
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
          {dummyData.filter((list) => listFilters[list.name]).map((list) => (
            <Box key={list.id} component="div" sx={{mt: 1, pr: 2, pl: 2}}>
              <h2 className="list-header">{list.name}</h2>
              <Grid container spacing={2} sx={{pt: 1, pb: 2}}>
                {list.recipes.filter(recipe => recipe.name.toUpperCase().includes(filterString.toUpperCase())).map((recipe) => (
                  <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
                    <ActionAreaCard imageString={recipe.imageString} titleString={recipe.name} rank={recipe.rank}
                                    skill={recipe.skill} time={recipe.time} selectFunc={() => console.log(recipe)}/>
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
