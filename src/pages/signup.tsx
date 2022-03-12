import UserContext from "../context/user-context";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

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
    <form onSubmit={handleSignup}>
      <input type="text" onChange={handleUsernameChange} autoComplete="off" autoFocus placeholder="Username"/>
      <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
      <input type="password" onChange={handleConfirmationPasswordChange} placeholder="Confirm password"/>
      <input type="submit" value="Sign up" disabled={signupButtonDisabled}/>
      <span hidden={!passwordWarningEnabled} style={{color: "red"}}>
        Password and confirmation password do not match!
      </span>
    </form>
  )
}
