import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [form , setform] = useState({email : '' , password: ''})
    const [error , setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const{ login }  = useAuth() ;
    const navigate = useNavigate() ;

    const handleSubmit = (e) => {
        e.preventDefault() 
        login('fake-token', { username:'baby' ,email: form.email })
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input 
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setform({...form , email: e.target.value})}
            />
            <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setform({...form , password: e.target.value})}
            required
            />
            <button type="submit" disabled={isLoading}>
                Login
            </button>
        </form> 
    )
    

}