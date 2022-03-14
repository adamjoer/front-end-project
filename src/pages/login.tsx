import "./login.css"
import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";

export default function Login() {
  const {logIn} = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const navigate = useNavigate();

  // FIXME: Avoid having to use event.target.value in the handlers, instead of the updated state variables

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);

    setLoginButtonDisabled(event.target.value.length <= 0 || password.length <= 0)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    setLoginButtonDisabled(username.length <= 0 || event.target.value.length <= 0)
  }

  const handleLogin = () => {
    logIn(username);
    navigate("/");
  }

  return (
    <div id="login-wrapper">
      <Box component="form" onSubmit={handleLogin} sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
           noValidate autoComplete="off">
        <div>
          <TextField type="text" onChange={handleUsernameChange} required id="outlined-required" label="Username"/>
        </div>
        <div>
          <TextField type="password" onChange={handlePasswordChange} required id="outlined-password-input"
                     label="Password"/>
        </div>
        <Button type="submit" disabled={loginButtonDisabled} variant="outlined">Log in</Button>
      </Box>
    </div>
  )
}
