import { useAuth} from "../auth/AuthContext" ;

export default function HomePage() {   
    const { user , logout } = useAuth();

    return (
        <div>
            <p>Welcome, {user?.username}!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}