import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {Link, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

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
    const usernameRegex = /^[a-zA-Z0-9-_]+$/;

    const passwordMinLength = 3;
    const passwordMaxLength = 30;

    let formIsValid = true;

    // Validate username
    if (username.length < usernameMinLength || username.length > usernameMaxLength) {
      setUsernameError(`Length must be between ${usernameMinLength} and ${usernameMaxLength}`);
      formIsValid = false;

    } else if (!usernameRegex.test(username)) {
      setUsernameError("Must only contain letters, numbers, dashes, and underscores.")
      formIsValid = false;

    } else {
      setUsernameError("");
    }

    // Validate password
    if (password.length < passwordMinLength || password.length > passwordMaxLength) {
      setPasswordError(`Length must be between ${passwordMinLength} and ${passwordMaxLength}`);
      formIsValid = false;
    } else {
      setPasswordError("");
    }

    return formIsValid;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ml: 3, mr: 3, mt: 3}}>
      <Card sx={{width: '300px'}}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmitForm} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Username" type="text" required onChange={handleUsernameChange}
                           error={usernameError.length > 0} helperText={usernameError} fullWidth/>
              </Grid>

              <Grid item xs={12}>
                <TextField label="Password" type="password" required onChange={handlePasswordChange}
                           error={passwordError.length > 0} helperText={passwordError} fullWidth/>
              </Grid>

              <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                <Button type="submit" variant="contained" color="secondary" sx={{color: "white"}}>Log in</Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </Box>
  )
}
