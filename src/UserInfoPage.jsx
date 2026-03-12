import { AuthContext } from "./auth-context";
import { useContext } from "react";

export default function UserInfoPage(){
    const user = useContext(AuthContext);


  return <h1>{user ? `Welcome, ${user.username} ,age:  ${user.age} ,role :  ${user.role} !` : "You are not logged in!"}</h1>;
}