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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(firebaseUser => setIsLoggedIn(firebaseUser != null))

  const logIn = (email: string, password: string, onFulfilled?: () => void, onRejected?: (error: any) => void,
                 onFinally?: () => void) => {

    signInWithEmailAndPassword(auth, email, password)
      .then(() => onFulfilled && onFulfilled())
      .catch((error) => onRejected && onRejected(error))
      .finally(() => onFinally && onFinally());
  }

  const createAccount = (firstName: string, lastName: string, email: string, password: string, onFulfilled?: () => void,
                         onRejected?: (error: any) => void, onFinally?: () => void) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const firstNameRef = ref(db, `users/${userCredential && userCredential.user.uid}/info/firstname`);
        const lastNameRef = ref(db, `users/${userCredential && userCredential.user.uid}/info/lastname`);
        set(firstNameRef, firstName);
        set(lastNameRef, lastName);

        onFulfilled && onFulfilled();
      })

      .catch((error) => onRejected && onRejected(error))
      .finally(() => onFinally && onFinally());
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
