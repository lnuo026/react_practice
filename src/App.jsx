import { useState  } from "react";
import { AuthContext } from "./auth-context";
import UserInfoPage from "./UserInfoPage";

function App(){
    const [ user , setUser] = useState(undefined);

    return(
        <div style ={{ margin: "10px" ,padding:"5px" ,border: " 1px solid black "}}>
            <div>
                <button onClick ={()=> setUser({ username : "Hammer"})}> Log in </button>
                <button onClick ={()=> setUser({ undefined})}> Log out </button>
                <button onClick={() => setUser({ username: " nora " ,age : "1" ,role: "student"})}> anther button </button>
            </div>

            < hr />
            <AuthContext.Provider value= {user}>
            <UserInfoPage/>
            </AuthContext.Provider >
        </div>

    );
}

export default App;