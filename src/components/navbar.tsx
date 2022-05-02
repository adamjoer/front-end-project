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
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../context/user-context";
import React, {useContext, useState} from "react";
import Image from "../images/logo2.png"

export default function Navbar() {
  const {user, logOut} = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

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
        navigate("/my-profile");
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
    <AppBar position="sticky" sx={{height: "70px"}}>
      <Container maxWidth="xl" sx={{position: "relative", top: "50%", transform: "translateY(-50%)"}}>
        <Toolbar disableGutters>

          <Box component={Link} to="/" sx={{mr: 2, display: {xs: "none", sm: "flex"}}}>
            <img src={Image} alt="Logo" style={{height: "60px"}}/>
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: "none", sm: "flex"}}}>
            {user &&
              (pagesLoggedIn).map((page) => (
                <Button key={page.name} component={Link} to={page.to}
                        sx={{
                          my: 2,
                          color: "white",
                          display: "block",
                          ':hover': {backgroundColor: '#FD8270', transition: '0.5s', fontSize: '18px'}
                        }}>
                  {page.name}
                </Button>
              ))}
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: "flex", sm: "none"}}}>
            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}
                        color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: "bottom", horizontal: "left",}}
                  keepMounted transformOrigin={{vertical: "top", horizontal: "left",}} open={anchorElNav != null}
                  onClose={handleCloseNavMenu} sx={{display: {xs: "block", sm: "none"},}}>
              {[{name: "Home", to: "/"}].concat(user ? pagesLoggedIn : pagesLoggedOut).map((page) => (
                <MenuItem key={page.name} component={Link} to={page.to} onClick={handleCloseNavMenu}>
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
                      transformOrigin={{vertical: "top", horizontal: "right",}} open={anchorElUser != null}
                      onClose={handleCloseUserMenu}>
                  {userSettings.map((setting) => (
                    <MenuItem key={setting.name} onClick={setting.onClick}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <Box sx={{flexGrow: 0, display: {xs: "none", sm: "flex"}}}>
                {pagesLoggedOut.map((page) => (
                  <Button key={page.name} component={Link} to={page.to} variant="contained" color="secondary"
                          sx={{
                            my: 2,
                            mx: 1,
                            color: "white",
                            display: "block",
                            ':hover': {backgroundColor: '#FD8270', transition: '0.5s', fontSize: '18px'}
                          }}>
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
