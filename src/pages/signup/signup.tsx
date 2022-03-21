import "./signup.css"
import UserContext from "../../context/user-context";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";

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
    <div id="signup-wrapper">
      <Box component="form" onSubmit={handleSignup} sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
           noValidate autoComplete="off">
        <div>
          <TextField type="text" onChange={handleUsernameChange} required id="outlined-required" label="Username"/>
        </div>
        <div>
          <TextField type="password" onChange={handlePasswordChange} required id="outlined-password-input"
                     label="Password"/>
        </div>
        <div>
          <TextField type="password" onChange={handleConfirmationPasswordChange} required id="outlined-password-input"
                     label="Confirm password"/>
        </div>
        <div id="password-warning" hidden={!passwordWarningEnabled}>
          Password and confirmation password do not match!
        </div>
        <Button type="submit" disabled={signupButtonDisabled} variant="contained">Sign in</Button>
      </Box>
    </div>
  )
}
