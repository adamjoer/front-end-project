import {createContext} from "react";

export type User = {
  firstName: String,
  lastName: String,
  username: String,
  email: String | null,
}

export type UserContextType = {
  user: User | null,
  logIn: (user: User, pw: string, email: string) => void,
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
