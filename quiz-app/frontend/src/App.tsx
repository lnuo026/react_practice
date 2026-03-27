/**
 * 从 react-router-dom 拿出两个组件：                        
  - Routes — 路由容器，包裹所有路由规则                     
  - Route — 单条路由规则（地址 → 页面）    
 */ 
import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRouter from "./components/ProtectedRoute";
import Chart from "./try";

/**
 *    规则一：用户访问 /（根路径）→ 显示 LoginPage  
      规则二：用户访问 /home → 先经过 ProtectedRoute 检查： 
      - 已登录 → 显示 HomePage                                  
      - 未登录 → 自动跳回 /  
 */
export default function App(){
  return(
    <Routes>
      <Route path="/" element={<LoginPage/>} />

        <Route path="/chart" element={<Chart/>}/>

      <Route path="/home" element={
        <ProtectedRouter>
          <HomePage/>
     
        </ProtectedRouter>
      }/>
    </Routes>
  )
}