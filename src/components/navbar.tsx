import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../context/user-context";
import {useContext} from "react";

export default function Navbar() {
  const {user, logOut} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {
          user ?
            <>
              <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Home
              </IconButton>
              <IconButton component={Link} to="/recipes" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Recipes
              </IconButton>
              <IconButton component={Link} to="/favorites" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Favorites
              </IconButton>
              <IconButton component={Link} to="/lists" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Lists
              </IconButton>
              <IconButton component={Link} to="/myprofile" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                My Profile
              </IconButton>
              <IconButton component={Button} onClick={handleLogout} edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Log Out
              </IconButton>
            </>
            :
            <>
              <IconButton component={Link} to="/signup" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Sign Up
              </IconButton>
              <IconButton component={Link} to="/login" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                Log In
              </IconButton>
            </>
        }
      </Toolbar>
    </AppBar>
  )
}
