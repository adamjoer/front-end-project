import "./home.css"
import Image from "../../src/images/food_image.jpg"
import Logo from "../../src/images/food_logo.png"
import {useNavigate} from "react-router-dom";
import React from "react";

export default function Home() {

    const navigate = useNavigate();

    const signUpClicked = () => {
        navigate("/signup");
    }

    const loginClicked = () => {
        navigate("/login")
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
            <div id="btns">
                <button id="sign-up-btn" onClick={signUpClicked}>Sign up</button>
                <button id="log-in-btn" onClick={loginClicked}>Log in</button>
            </div>

        </div>
    );
}