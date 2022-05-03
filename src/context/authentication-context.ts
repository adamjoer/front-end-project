import {createContext} from "react";

type AuthenticationContextType = {
  isLoggedIn: boolean,
  createAccount: (firstName: string, lastName: string, email: string, pw: string, successCallback?: () => void) => void,
  logIn: (email: string, pw: string, successCallback?: () => void) => void,
  logOut: () => void,
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  isLoggedIn: false,
  createAccount: () => {
  },
  logIn: () => {
  },
  logOut: () => {
  },
})

export default AuthenticationContext
