import {createContext} from "react";

export type User = {
  name: String,
}

export type UserContextType = {
  user: User | null,
  logIn: (username: String) => void,
  logOut: () => void,
}

const UserContext = createContext<UserContextType>({
  user: null,
  logIn: () => {
  },
  logOut: () => {
  },
})

export default UserContext
