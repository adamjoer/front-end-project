import "./home.css"
import Image from "../../src/images/frontpage1.png"

import React, {useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import AuthenticationContext from "../context/authentication-context";
import ActionAreaCard from "../components/recipecard/card";

const dummyRecipes = [
  {
    imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
    recipeName: "burger",
    rank: 2,
    skill: "easy",
    time: 30,
    id: 1,
  },
  {
    imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
    recipeName: "burger",
    rank: 2,
    skill: "easy",
    time: 30,
    id: 2,
  },
  {
    imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    rank: 4,
    skill: "easy",
    time: 30,
    id: 3,
  },
  {
    imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
    recipeName: "burger",
    rank: 2,
    skill: "easy",
    time: 30,
    id: 4,
  },
  {
    imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    rank: 4,
    skill: "easy",
    time: 30,
    id: 5,
  }

]

export default function Home() {

  const {isLoggedIn} = useContext(AuthenticationContext);

  return (
    <div id="content">
      <div style={{display: "flex"}}>
        <div id="welcome-box">

          <p>Be inspired by looking through popular dishes, get the recipe and vote on your favorite dishes with Taste It!</p>

        </div>
        <div id="welcome-image">
          <img src={Image} style={{width: '700px', height: '408px'}} alt='Food'/>
        </div>

      </div>

      <div id="row">
        <h2>Popular recipes this week:</h2>
        <Grid container spacing={2}>
          {dummyRecipes.map(x => {

            return <Grid key={x.id} item xs={12} sm={4} md={3} lg={2.4} xl={2}>
              <ActionAreaCard imageString={x.imageUrl} titleString={x.recipeName} rank={x.rank} skill={x.skill}
                              time={x.time}
                              selectFunc={() => {
                              }}/>
            </Grid>
          })}
        </Grid>
        <Button component={Link} to={isLoggedIn ? "/recipes" : "/signup"}
                sx={{color: "white", ':hover': {transition: '0.5s', fontSize: '18px'}}} id="btn-all-recipes"
                color="secondary" variant="contained">See all recipes</Button>
      </div>
    </div>
  );
}
