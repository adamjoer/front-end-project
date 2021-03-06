import React, {useContext, useState} from "react";
import AuthenticationContext from "../context/authentication-context";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Backdrop, CircularProgress} from "@mui/material";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

export default function SignUp() {
  const {createAccount} = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [confirmationPasswordError, setConfirmationPasswordError] = useState("");

  const [isLoadingAnimationEnabled, setLoadingAnimationEnabled] = useState(false);

  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
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

    setLoadingAnimationEnabled(true);

    createAccount(firstName, lastName, email, password,
      () => navigate("/"),
      (error) => setSignupErrorMessage(error.message),
      () => setLoadingAnimationEnabled(false)
    );
  }

  const validateForm = (): boolean => {

    // TODO: Put these constants a more appropriate place
    const firstNameMinLength = 2;
    const firstNameMaxLength = 30;

    const lastNameMinLength = 2;
    const lastNameMaxLength = 30;

    const passwordMinLength = 6;
    const passwordMaxLength = 30;

    const emailMinLength = 6;
    const emailMaxLength = 50;
    // From https://www.emailregex.com/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateLength = (input: string, minLength: number, maxLength: number, errorFunc: (errorMsg: string) => void): boolean => {
      if (input.length < minLength || input.length > maxLength) {
        errorFunc(`Length must be between ${minLength} and ${maxLength}`);
        formIsValid = false;
        return false;

      } else {
        errorFunc("");
        return true;
      }
    }

    let formIsValid = true;

    // Validate first name
    validateLength(firstName, firstNameMinLength, firstNameMaxLength, setFirstNameError);

    // Validate last name
    validateLength(lastName, lastNameMinLength, lastNameMaxLength, setLastNameError);

    // Validate email
    if (validateLength(email, emailMinLength, emailMaxLength, setEmailError) && !emailRegex.test(email)) {
      setEmailError("Must to be a valid email address");
      formIsValid = false;
    }

    // Validate password
    validateLength(password, passwordMinLength, passwordMaxLength, setPasswordError);

    // Validate confirmation password
    if (validateLength(confirmationPassword, passwordMinLength, passwordMaxLength, setConfirmationPasswordError) && confirmationPassword !== password) {
      setConfirmationPasswordError("Confirmation password must match password");
      formIsValid = false;
    }

    return formIsValid;
  }

  return (
    <>
      <Backdrop open={isLoadingAnimationEnabled} onClick={() => setLoadingAnimationEnabled(false)}
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <CircularProgress color="secondary"/>
      </Backdrop>

      <Box display="flex" flexDirection="column" alignItems="center" sx={{m: 2}}>
        <Alert severity="error" sx={{
          display: signupErrorMessage.length > 0 ? "flex" : "none",
          maxWidth: "500px",
          mb: 2
        }}>{signupErrorMessage}</Alert>

        <Card sx={{maxWidth: "500px"}}>
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

                <Grid item xs={12}>
                  <TextField label="E-mail" type="text" required onChange={handleEmailChange}
                             error={emailError.length > 0} helperText={emailError} fullWidth/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Password" type="password" required onChange={handlePasswordChange}
                             error={passwordError.length > 0} helperText={passwordError} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Confirm password" type="password" required
                             onChange={handleConfirmationPasswordChange}
                             error={confirmationPasswordError.length > 0} helperText={confirmationPasswordError}
                             fullWidth/>
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
    </>
  )
}
