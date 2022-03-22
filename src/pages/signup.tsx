import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {Link, useNavigate} from "react-router-dom";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function SignUp() {
  const {logIn} = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);
  const [passwordWarningEnabled, setPasswordWarningEnabled] = useState(false);

  const navigate = useNavigate();

  // FIXME: Avoid having to use event.target.value in the handlers, instead of the updated state variables

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);

    setSignupButtonDisabled(event.target.value.length <= 0 || password.length <= 0 || confirmationPassword.length <= 0)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    setSignupButtonDisabled(username.length <= 0 || event.target.value.length <= 0 || confirmationPassword.length <= 0 || confirmationPassword !== event.target.value)
    setPasswordWarningEnabled(confirmationPassword.length > 0 && confirmationPassword !== event.target.value)
  }

  const handleConfirmationPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationPassword(event.target.value);

    setSignupButtonDisabled(username.length <= 0 || password.length <= 0 || event.target.value.length <= 0 || password !== event.target.value)
    setPasswordWarningEnabled(event.target.value.length > 0 && password !== event.target.value);
  }

  const handleSignup = () => {
    logIn(username);
    navigate("/");
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{mt: 3}}>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSignup} noValidate autoComplete="off" display="flex"
               flexDirection="column" alignItems="center" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}>
            <TextField type="text" onChange={handleUsernameChange} required id="outlined-required" label="Username"/>
            <TextField type="password" onChange={handlePasswordChange} required id="outlined-password-input"
                       label="Password"/>
            <TextField type="password" onChange={handleConfirmationPasswordChange} required id="outlined-password-input"
                       label="Confirm password" error={passwordWarningEnabled}
                       helperText={passwordWarningEnabled ? "Passwords do not match." : " "}/>
            <Button type="submit" disabled={signupButtonDisabled} variant="contained" color="secondary">Sign up</Button>
          </Box>
        </CardContent>
      </Card>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </Box>
  )
}
