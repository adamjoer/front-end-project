import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/user-context";
import React, {useContext, useState} from "react";

export default function Navbar() {
  const {user, logOut} = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();

  const pagesLoggedIn = [
    {name: "Recipes", to: "/recipes"},
    {name: "Favorites", to: "/favorites"},
    {name: "Lists", to: "/lists"},
  ];

  const pagesLoggedOut = [
    {name: "Sign up", to: "/signup"},
    {name: "Log in", to: "/login"},
  ];

  const userSettings = [
    {
      name: "Profile",
      onClick: () => {
        navigate("/myprofile");
        setAnchorElUser(null);
      }
    },
    {
      name: "Log out",
      onClick: () => {
        logOut();
        setAnchorElUser(null);
      }
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography variant="h6" noWrap component="div" sx={{mr: 2, display: {xs: "none", md: "flex"}}}
                      onClick={() => (navigate("/"))}>
            LOGO
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            {user &&
              (pagesLoggedIn).map((page) => (
                <Button key={page.name} onClick={() => (navigate(page.to))}
                        sx={{my: 2, color: "white", display: "block", ':hover':{bgcolor: '#FD8270', transition: '0.3s', fontSize:'16px'} }}>
                  {page.name}
                </Button>
              ))}
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}
                        color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: "bottom", horizontal: "left",}}
                  keepMounted transformOrigin={{vertical: "top", horizontal: "left",}} open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu} sx={{display: {xs: "block", md: "none"},}}>
              {[{name: "Home", to: "/"}].concat(user ? pagesLoggedIn : pagesLoggedOut).map((page) => (
                <MenuItem key={page.name} onClick={() => {
                  navigate(page.to);
                  setAnchorElNav(null);
                }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {
            user ?
              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Remy Sharp"/>
                  </IconButton>
                </Tooltip>
                <Menu sx={{mt: "45px"}} id="menu-appbar" anchorEl={anchorElUser}
                      anchorOrigin={{vertical: "top", horizontal: "right",}} keepMounted
                      transformOrigin={{vertical: "top", horizontal: "right",}} open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                  {userSettings.map((setting) => (
                    <MenuItem key={setting.name} onClick={setting.onClick}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <Box sx={{flexGrow: 0, display: {xs: "none", md: "flex"}}}>
                {pagesLoggedOut.map((page) => (
                  <Button key={page.name} variant="contained" color="secondary" onClick={() => (navigate(page.to))}
                          sx={{my: 2, mx: 1, color: "white", display: "block", ':hover':{bgcolor: '#FD8270', transition: '0.3s', fontSize:'16px'}}}>
                    {page.name}
                  </Button>
                ))}
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}
