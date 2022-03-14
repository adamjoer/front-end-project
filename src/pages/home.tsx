import "./home.css"
import Image from "../../src/images/food_image.jpg"
import Logo from "../../src/images/food_logo.png"
import React from "react";

export default function Home() {

    return(
        <div id="content">
            <div id="welcome-box">
                <img src={Logo}/>
                <p>Find popular dishes, make food and vote with *name *</p>
            </div>
            <div id="welcome-image">
                <img src={Image}/>
            </div>

        </div>
    );
}