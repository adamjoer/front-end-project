import React, {useContext, useState} from "react";
import UserContext from "../context/user-context";
import {useNavigate} from "react-router-dom";

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
    <form onSubmit={handleLogin}>
      <input type="text" onChange={handleUsernameChange} autoComplete="off" autoFocus placeholder="Username"/>
      <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
      <input type="submit" value="Log in" disabled={loginButtonDisabled}/>
    </form>
  )
}
