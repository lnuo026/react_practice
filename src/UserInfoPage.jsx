import { AuthContext } from "./auth-context";
import { useContext } from "react";

export default function UserInfoPage(){
    const user = useContext(AuthContext);

return <h1>{ user ? `Welcome,  ${user.username} !` : "You are not logged in!"}</h1>

}