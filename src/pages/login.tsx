import React, {useContext, useState} from "react";
import AuthenticationContext from "../context/authentication-context";
import {Link, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";

export default function Login() {
  const {logIn} = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm())
      return;

    logIn(email, password, () => navigate("/"));
  }

  const validateForm = (): boolean => {

    // TODO: Put these constants a more appropriate place
    const emailMinLength = 3;
    const emailMaxLength = 50;
    // From https://www.emailregex.com/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordMinLength = 3;
    const passwordMaxLength = 30;

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

    // Validate email
    if (validateLength(email, emailMinLength, emailMaxLength, setEmailError) && !emailRegex.test(email)) {
      setEmailError("Must to be a valid email address");
      formIsValid = false;
    }

    // Validate password
    validateLength(password, passwordMinLength, passwordMaxLength, setPasswordError);

    return formIsValid;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{m: 2}}>
      <Card sx={{maxWidth: "500px"}}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmitForm} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Email" type="email" onChange={handleEmailChange}
                           error={emailError.length > 0} helperText={emailError} fullWidth/>
              </Grid>

              <Grid item xs={12}>
                <TextField label="Password" type="password" required onChange={handlePasswordChange}
                           error={passwordError.length > 0} helperText={passwordError} fullWidth/>
              </Grid>

              <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                <Button type="submit" variant="contained" color="secondary"
                        sx={{color: "white", ':hover': {transition: '0.5s', fontSize: '18px'}}}>Log in</Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </Box>
  )
}
