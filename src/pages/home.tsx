import "./home.css"
import Image from "../../src/images/food_image.jpg"
import Logo from "../../src/images/food_logo.png"
import React from "react";
import MaterialCard from "../components/materialcard";
import {Grid} from "@mui/material";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
//img link https://spoonacular.com/recipeImages/362230-556x370.jpeg
    return(
        <div id="content">
            <div id="welcome-box">
                <img src={Logo}/>
                <p>Find popular dishes, make food and vote with *name *</p>
            </div>
            <div id="welcome-image">
                <img src={Image}/>
            </div>
            <div id="row">
                <h2>Popular recipes this week:</h2>
                    <Grid container spacing={4}>
                        <MaterialCard/>
                        <MaterialCard/>
                        <MaterialCard/>
                        <MaterialCard/>
                        <MaterialCard/>
                    </Grid>
            </div>
        </div>
    );
}