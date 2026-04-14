

// 就是react的useContext + buildin localStorage + usestate
import { createContext , useContext,useEffect ,useState } from "react"; 

//   AuthContext 的作用：建一个全局储物柜，任何组件直接来取。 
// 第一步：创建储物柜   
const AuthContext = createContext() ;

//  第二步：往柜子里放东西（AuthProvider） 
//  {children} 就是被 <AuthProvider> 包裹的所有子组件（整个 App）。 App.jsx
export const AuthProvider = ({ children }) => {
    // 用户信息
    const [user, setUser] = useState(null) ;
    // 登陆凭证
    const [token, setToken] = useState(null) ;
    // 页面是否还在初始化 
    const [loading ,setLoading] = useState(true) ;

    // 第三步：页面刷新时，自动恢复登录状态  
    //     登录时把 token 存进                                       
    //   localStorage（浏览器本地存储，刷新不丢失）。
    //   页面一加载，useEffect 自动检查 localStorage                      
    //   里有没有存的登录信息，有就恢复。
    useEffect(() => {
        const savedToken = localStorage.getItem('token') 
        const savedUser = localStorage.getItem('user')
        if(savedToken && savedUser){
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // 登录时：存两个地方（localStorage + React状态） 
const login = (tokenValue ,userData ) => {
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(tokenValue)
    setUser(userData)
    
}

// 退出时：两个地方都清掉       
const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
}

// 第五步：把储物柜开放给所有子组件
//  {children} 就是被 <AuthProvider> 包裹的所有子组件（整个 App）。 App.jsx + NavBar
// 比如logout自己没有export ，但是外组件可以从  auth直接解构
    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// useAuth — 方便取东西的快捷方式
export function useAuth(){
    return useContext(AuthContext)
}