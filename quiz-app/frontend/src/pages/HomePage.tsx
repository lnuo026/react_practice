import { useAuthStore } from "../store/authStore";
export default function HomePage(){
    const user = useAuthStore((s)=> s.user)
        return (
            <div style= {{ textAlign:'center' , marginTop:'100px'}}>
                <h1>Welcome back, {user?.displayName}</h1>
                <p>{user?.email}</p>
            </div>
        )
}