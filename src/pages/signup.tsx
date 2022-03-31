import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {Link, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

export default function SignUp() {
  const {logIn} = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [confirmationPasswordError, setConfirmationPasswordError] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleConfirmationPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationPassword(event.target.value);
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
    const firstNameMinLength = 2;
    const firstNameMaxLength = 30;

    const lastNameMinLength = 2;
    const lastNameMaxLength = 30;

    const usernameMinLength = 3;
    const usernameMaxLength = 30;
    const usernameRegex = /^[a-zA-Z0-9-_]+$/;

    const passwordMinLength = 3;
    const passwordMaxLength = 30;

    // From https://www.emailregex.com/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let formIsValid = true;

    // Validate first name
    if (firstName.length < firstNameMinLength || firstName.length > firstNameMaxLength) {
      setFirstNameError(`Length must be between ${firstNameMinLength} and ${firstNameMaxLength}`);
      formIsValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate last name
    if (lastName.length < lastNameMinLength || lastName.length > lastNameMaxLength) {
      setLastNameError(`Length must be between ${lastNameMinLength} and ${lastNameMaxLength}`);
      formIsValid = false;
    } else {
      setLastNameError("");
    }

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

    // Validate email if it has been submitted
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError("Must to be a valid email address");
      formIsValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (password.length < passwordMinLength || password.length > passwordMaxLength) {
      setPasswordError(`Length must be between ${passwordMinLength} and ${passwordMaxLength}`);
      formIsValid = false;
    } else {
      setPasswordError("");
    }

    // Validate confirmation password
    if (confirmationPassword !== password) {
      setConfirmationPasswordError("Confirmation password must match password");
      formIsValid = false;
    } else {
      setConfirmationPasswordError("");
    }

    return formIsValid;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ml: 3, mr: 3, mt: 3}}>
      <Card sx={{minWidth: '300px', maxWidth: '600px'}}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmitForm} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="First name" type="text" required onChange={handleFirstNameChange}
                           error={firstNameError.length > 0} helperText={firstNameError} fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Last name" type="text" required onChange={handleLastNameChange}
                           error={lastNameError.length > 0} helperText={lastNameError} fullWidth/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Username" type="text" required onChange={handleUsernameChange}
                           error={usernameError.length > 0} helperText={usernameError} fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="E-mail" type="text" onChange={handleEmailChange}
                           error={emailError.length > 0} helperText={emailError} fullWidth/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Password" type="password" required onChange={handlePasswordChange}
                           error={passwordError.length > 0} helperText={passwordError} fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Confirm password" type="password" required onChange={handleConfirmationPasswordChange}
                           error={confirmationPasswordError.length > 0} helperText={confirmationPasswordError} fullWidth/>
              </Grid>

              <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                <Button type="submit" variant="contained" color="secondary" sx={{color: "white"}}>Sign up</Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </Box>
  )
}