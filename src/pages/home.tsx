import "./home.css"
import Image from "../../src/images/frontpage.png"

import Logo from "../../src/images/food_logo.png"
import React, {useContext} from "react";
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/user-context";
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
//img link https://spoonacular.com/recipeImages/362230-556x370.jpeg
  //TODO: change so that when screen is xs, the picture doesnt go over the welcome box

  const navigate = useNavigate();

  const goToRecipes = () => {
    navigate("/recipes")
  }

  const {user} = useContext(UserContext);

  return(
    <div id="content">
      <div style={{display: "flex", width: "calc(100vw - 643px)", position: 'relative', height: '400px'}}>
        <div id="welcome-box" >
          
          <p>Find popular dishes, make food and vote with *name *</p>
          
          
        </div>
        <div id="welcome-image">
          <img src={Image}/>
        </div>

      </div>

      <h2>Popular recipes this week:</h2>
      <div id="row">
        <Grid container spacing={2}>
          {dummyRecipes.map(x => {

            return <Grid key={x.id} item xs={4} md={3} lg={2}>
              <ActionAreaCard imageString={x.imageUrl} titleString={x.recipeName} rank={x.rank} skill={x.skill} time={x.time}
                              selectFunc={() => {}}/>
            </Grid>
          })}
        </Grid>
        <Button sx={{color: "white", ':hover':{ transition: '0.5s', fontSize:'18px'}}} id="btn-all-recipes" onClick={goToRecipes} disabled={!user} color="secondary" variant="contained">See all recipes</Button>
      </div>
    </div>
  );
}
