import { useState  } from "react";
import { AuthContext } from "./auth-context";
import UserInfoPage from "./UserInfoPage";
import LoginPage from "./LoginPage";

function App(){
    const [ user , setUser] = useState(undefined);

    return(
        <div style ={{ margin: "10px" ,padding:"5px" ,border: " 1px solid black "}}>
           
           < hr />
            <AuthContext.Provider value= {[user , setUser]}>
            < LoginPage/>
            <hr />
            <UserInfoPage/>
            </AuthContext.Provider >
        </div>

    );
}

export default App;