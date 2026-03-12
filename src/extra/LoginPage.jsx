import { AuthContext } from "./extra/auth-context";
import { useContext } from "react";

export default function LoginPage(){
    const [user, setUser] = useContext(AuthContext);

    return(
        <div>
            <button onClick={() => setUser({username : "bob"})}>Log in </button>
            <button onClick={() => setUser(undefined)}>Log out </button>

        </div>
    );

}