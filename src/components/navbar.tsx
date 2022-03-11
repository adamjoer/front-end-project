import {AppBar, IconButton, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

export default function Navbar() {
  return <AppBar position="static">
    <Toolbar>
      <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        Home
      </IconButton>
      <IconButton component={Link} to="/myprofile" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        My profile
      </IconButton>
      <IconButton component={Link} to="/login" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        Login
      </IconButton>
      <IconButton component={Link} to="/recipes" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        Recipies
      </IconButton>
      <IconButton component={Link} to="/favorites" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        Favorits
      </IconButton>
      <IconButton component={Link} to="/lists" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
        Lists
      </IconButton>
    </Toolbar>
  </AppBar>
}
