import {createContext} from "react";

export type AuthenticationContextType = {
  isLoggedIn: boolean,
  logIn: (pw: string, email: string) => void,
  logOut: () => void,
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  isLoggedIn: false,
  logIn: () => {
  },
  logOut: () => {
  },
})

export default AuthenticationContext
