import { AuthContext } from "./extra/auth-context";
import { useContext } from "react";

export default function UserInfoPage(){
    const [user  , setUser]  = useContext(AuthContext);


  return <h1>{user ? `Welcome, ${user.username}!` : "You are not logged in!"}</h1>;
}