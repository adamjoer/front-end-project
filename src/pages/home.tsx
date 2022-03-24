import "./home.css"
import Image from "../../src/images/food_image.jpg"
import Logo from "../../src/images/food_logo.png"
import React, {useContext} from "react";
import MaterialCard from "../components/materialcard";
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/user-context";

const dummyRecipes = [
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 2,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 2,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        rank: 4,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/362230-556x370.jpeg",
        recipeName: "burger",
        rank: 2,
        skill: "easy",
        time: 30,
    },
    {
        imageUrl: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        recipeName: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        rank: 4,
        skill: "easy",
        time: 30,
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
            <div style={{display: "flex"}}>
                <div id="welcome-box" style={{width: "calc(100vw - 643px)"}}>
                    <img src={Logo}/>
                    <p>Find popular dishes, make food and vote with *name *</p>
                </div>
                <div id="welcome-image" style={{width: "400px"}}>
                    <img src={Image}/>
                </div>

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
                <Button id="btn-all-recipes" onClick={goToRecipes} disabled={!user}>See all recipes</Button>
            </div>
        </div>
    );
}