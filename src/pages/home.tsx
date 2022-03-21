import "./home.css"
import Image from "../../src/images/food_image.jpg"
import Logo from "../../src/images/food_logo.png"
import React from "react";
import MaterialCard from "../components/materialcard";
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const dummyRecipes = [
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 3,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 3,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        rank: 3,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 3,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        rank: 3,
        skill: "easy",
        time: 30,
    }

]

export default function Home() {
//img link https://spoonacular.com/recipeImages/362230-556x370.jpeg

    const navigate = useNavigate();
    
    const goToRecipes = () => {
        navigate("/recipes")
    }

    return(
        <div id="content">
            <div id="welcome-box">
                <img src={Logo}/>
                <p>Find popular dishes, make food and vote with *name *</p>
            </div>
            <div id="welcome-image">
                <img src={Image}/>
            </div>
            <h2>Popular recipes this week:</h2>
            <div id="row">
                    <Grid container spacing={2}>
                        {dummyRecipes.map(x => {

                            return <Grid item xs={4} md={3} lg={2}>
                                <MaterialCard imageUrl={x.imageUrl} recipeName={x.recipeName} rank={x.rank} skill={x.skill} time={x.time}/>
                            </Grid>
                        })}
                    </Grid>
                <Button id="btn-all-recipes" onClick={goToRecipes}>See all recipes</Button>
            </div>
        </div>
    );
}