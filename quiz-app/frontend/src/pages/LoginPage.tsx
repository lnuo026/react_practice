import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider} from "../lib/firebase";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
//更新 , 登录成功后额外调用后端存用户：

import { apiFetch } from '../lib/api'

export default function LoginPage(){
    const setUser = useAuthStore((s) => s.setUser)
    const navigate = useNavigate()

    const handleLogin = async() =>{
        const result = await signInWithPopup(auth,googleProvider)
            setUser(result.user)
            // 把用户信息存到自己的后端数据库
            // 登录成功拿到 Firebase token 之后，立刻调用后端 POST                    
            //  /users/login，后端的 AuthGuard 验证 token，然后把用户信息存进 MongoDB
            await apiFetch('/users/login', { method: 'POST' })
            navigate('/home')
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '200px' }}> 
        <h1>我是聪明豆豆</h1>
        <button onClick={handleLogin}>我是笨蛋铁锤，使用google 登陆</button>
            </div>
    )
}