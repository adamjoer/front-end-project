import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {Link, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function Login() {
  const {logIn} = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm())
      return;

    logIn(username);
    navigate("/");
  }

  const validateForm = (): boolean => {
    // TODO: Put these constants a more appropriate place
    const usernameMinLength = 3;
    const usernameMaxLength = 30;

    const passwordMinLength = 3;
    const passwordMaxLength = 30;

    let formIsValid = true;

    if (username.length < usernameMinLength || username.length > usernameMaxLength) {
      setUsernameError(`Length needs to be between ${usernameMinLength} and ${usernameMaxLength}`);
      formIsValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length < passwordMinLength || password.length > passwordMaxLength) {
      setPasswordError(`Length needs to be between ${passwordMinLength} and ${passwordMaxLength}`);
      formIsValid = false;
    } else {
      setPasswordError("");
    }

    return formIsValid;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{mt: 3}}>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmitForm} noValidate autoComplete="off" display="flex"
               flexDirection="column" alignItems="center" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}>
            <TextField type="text" onChange={handleUsernameChange} required id="outlined-required"
                       label="Username" error={usernameError.length > 0} helperText={usernameError}/>
            <TextField type="password" onChange={handlePasswordChange} required id="outlined-password-input"
                       label="Password" error={passwordError.length > 0} helperText={passwordError}/>
            <Button type="submit" variant="contained" color="secondary">Log in</Button>
          </Box>
        </CardContent>
      </Card>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </Box>
  )
}
