
// useNavigate 是 React Router 提供的跳转工具  
// 2 步 
import { Link , useNavigate} from 'react-router-dom';
 import { useAuth } from '../auth/AuthContext';

 export default function Navbar(){
    const { user, logout } = useAuth();
    // // 第一步：拿到 navigate 函数
    const navigate = useNavigate();

    // 第二步：想跳哪里就写哪里 
    // 调用 navigate('/login') 来跳转到登录页
    const handleLogout = () => {
        logout();
        navigate('/login')
 }

    return (
        <nav className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between shadow">
            <Link to="/" className="text-xl font-bold tracking-tight">
                
            </Link>
            <div>
                {/* // 登录了 → 显示用户名 + 退出按钮 */}
                {user ? (
                <>
                <span className="text-sm opacity-80">Hi,goood morning, {user ? user.username : 'unknown user'}!</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
                </>

                ):(
                // 没登录 → 显示 Login + Register 链接 
                <>
                <Link to="/login" className="mr-4 hover:underline">
                    Login
                </Link>
                <Link to="/register" className="hover:underline">
                    Register
                </Link>
                </>
                )}
            </div>
        </nav>

 )
}