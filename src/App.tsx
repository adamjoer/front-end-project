import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useState} from "react";
import UserContext, {User} from "./context/user-context";
import Home from './pages/home';
import Layout from './pages/Layout';
import Myprofile from './pages/myprofile';
import Login from './pages/login';
import Favorites from './pages/favorites';
import Lists from './pages/lists';
import {Recipes} from './pages/recipes/recipes';
import SignUp from "./pages/signup";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {

  const [user, setUser] = useState<User | null>(null)

  const logIn = (username: String) => {
    setUser({
      name: username,
    })
  }

  const logOut = () => {
    setUser(null)
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#476051",
      },
      secondary: {
        main: "#FD8270"
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{user, logIn, logOut}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="signup" element={!user ? (<SignUp/>) : (<Navigate replace to="/"/>)}/>
              <Route path="login" element={!user ? (<Login/>) : (<Navigate replace to="/"/>)}/>
              <Route path="myprofile" element={user ? (<Myprofile/>) : (<Navigate replace to="/"/>)}/>
              <Route path="recipes" element={user ? (<Recipes/>) : (<Navigate replace to="/"/>)}/>
              <Route path="favorites" element={user ? (<Favorites/>) : (<Navigate replace to="/"/>)}/>
              <Route path="lists" element={user ? (<Lists/>) : (<Navigate replace to="/"/>)}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
