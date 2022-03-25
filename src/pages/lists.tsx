import React, {ChangeEvent, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import ActionAreaCard from "../components/recipecard/card";

export default function Lists() {

  const dummyData = [
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

  const listNames = dummyData.map(list => list.name)

  const [filterString, setFilterString] = useState("");

  const [listFilters, setListFilters] = useState<{ [key: string]: boolean }>(listNames.reduce((listOptions, listOption) => ({
    ...listOptions,
    [listOption]: true
  }), {}))

  const handleFilterStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} md={3} lg={3}>
          <h1 style={{paddingLeft: "25px"}}>Lists</h1>
        </Grid>
        <Grid item xs={8} md={9} lg={9}>
          <div style={{padding: "20px 15px 0px 0px"}}>
            <TextField onChange={handleFilterStringChange} fullWidth label="Search for a recipe name" variant="outlined"/>
          </div>
        </Grid>
      </Grid>

      <hr/>

      <Grid container spacing={2}>
        <Grid item xs={4} md={3} lg={3}>
          <b>Filter</b>
          <hr/>
          <FormGroup>
            {listNames.map((listName) => (
              <FormControlLabel key={listName}
                                control={<Checkbox/>}
                                label={listName} checked={listFilters[listName]}
                                onChange={(event, checked) => setListFilters(prevState => ({
                                  ...prevState,
                                  [listName]: checked
                                }))}/>
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={8} md={9} lg={9}>
          {dummyData.filter((list) => listFilters[list.name]).map((list) => (
            <div key={list.id}>
              <h2>{list.name}</h2>
              <Grid container spacing={2}>
                {list.recipes.filter(recipe => recipe.name.toUpperCase().includes(filterString.toUpperCase())).map((recipe) => (
                  <Grid key={recipe.id} item xs={4} md={3} lg={3}>
                    <ActionAreaCard imageString={recipe.imageString} titleString={recipe.name} rank={recipe.rank}
                                    skill={recipe.skill} time={recipe.time} selectFunc={() => console.log(recipe)}/>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  )
}
