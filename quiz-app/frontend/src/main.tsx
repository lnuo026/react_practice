// React 的严格模式，开发时帮你发现潜在问题，会把组件渲染两次来检测 bug。上线后自动关掉。      
import { StrictMode } from "react";
// 把 React 应用"挂载"到 HTML 页面上的函数。
import { createRoot } from "react-dom/client";
// 路由的容器，必须包在最外层，App.tsx 里的 Routes 才能工作。
import { BrowserRouter } from "react-router-dom";

// 导入全局样式和根组件。
import './index.css'
import App from "./App";

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </StrictMode>
)