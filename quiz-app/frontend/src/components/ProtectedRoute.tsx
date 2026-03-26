import {Navigate} from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRouter({children} : {
    children: React.ReactNode}){
        //  从 Zustand 仓库里读取当前用户
        const user = useAuthStore((s) => s.user)
        /**
         *  三元运算符，意思是：                                      
            - user 有值（已登录）→ 显示 children（里面的页面内容）
            - user 是 null（未登录）→ 跳转到 /（登录页） 
         */ 
        return user ? <>{children}</> : <Navigate to="/" replace/>       
        

}