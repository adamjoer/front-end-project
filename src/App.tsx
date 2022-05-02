import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useState} from "react";
import UserContext, {User} from "./context/user-context";
import Home from './pages/home';
import Layout from './pages/Layout';
import MyProfile from './pages/my-profile';
import Login from './pages/login';
import Favorites from './pages/favorites';
import Lists from './pages/lists/lists';
import Recipes from './pages/recipes/recipes';
import SignUp from "./pages/signup";
import {createTheme, ThemeProvider} from "@mui/material";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut,signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD43KvYWj6dAG_ILb5tkDgXLKXbHxXYuf0",
  authDomain: "food2side.firebaseapp.com",
  databaseURL: "https://food2side-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food2side",
  storageBucket: "food2side.appspot.com",
  messagingSenderId: "616953678318",
  appId: "1:616953678318:web:2a4cad4ed1528458e0a6ff",
  measurementId: "G-N5ST53G5HR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function App() {  
  const [user, setUser] = useState<User | null>(null)

  auth.onAuthStateChanged(fbuser => {
    if (fbuser) {
      if (!user){
        setUser({firstName: "r", lastName: "d", username: fbuser.uid, email: fbuser.email})
      } 
    } else {
      setUser(null)
    }
  })

  const logIn = (user: User, pw: string) => {
    // setUser(user)

    signInWithEmailAndPassword(auth, "test@test.com", "test12");
  }

  const logOut = () => {
    signOut(auth);
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
              <Route path="my-profile" element={user ? (<MyProfile/>) : (<Navigate replace to="/"/>)}/>
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
