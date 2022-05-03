import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useState} from "react";
import AuthenticationContext from "./context/authentication-context";
import Home from './pages/home';
import Layout from './pages/Layout';
import MyProfile from './pages/my-profile';
import Login from './pages/login';
import Favorites from './pages/favorites';
import Lists from './pages/lists/lists';
import Recipes from './pages/recipes/recipes';
import SignUp from "./pages/signup";
import {createTheme, ThemeProvider} from "@mui/material";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(fbuser => {
    setIsLoggedIn(fbuser != null);
  })

  const logIn = (email: string, password: string, successCallback?: () => void) => {

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (successCallback)
          successCallback();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const createAccount = (firstName: string, lastName: string, email: string, password: string, successCallback?: () => void) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

      const firstNameRef = ref(db, `users/${userCredential && userCredential.user.uid}/info/firstname`);
      const lastNameRef = ref(db, `users/${userCredential && userCredential.user.uid}/info/lastname`);
      set(firstNameRef, firstName);
      set(lastNameRef, lastName);

      if (successCallback)
        successCallback();
    })
  }

  const logOut = () => {
    signOut(auth);
    setIsLoggedIn(false);
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
      <AuthenticationContext.Provider value={{isLoggedIn, createAccount, logIn, logOut}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="signup" element={!isLoggedIn ? (<SignUp/>) : (<Navigate replace to="/"/>)}/>
              <Route path="login" element={!isLoggedIn ? (<Login/>) : (<Navigate replace to="/"/>)}/>
              <Route path="my-profile" element={isLoggedIn ? (<MyProfile/>) : (<Navigate replace to="/"/>)}/>
              <Route path="recipes" element={isLoggedIn ? (<Recipes/>) : (<Navigate replace to="/"/>)}/>
              <Route path="favorites" element={isLoggedIn ? (<Favorites/>) : (<Navigate replace to="/"/>)}/>
              <Route path="lists" element={isLoggedIn ? (<Lists/>) : (<Navigate replace to="/"/>)}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
