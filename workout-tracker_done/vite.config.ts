import { defineConfig } from 'vite'
// 引入 React 插件，让 Vite 能看懂 JSX（<div> 这种写法
import react from '@vitejs/plugin-react'
//  Tailwind v4 不再用独立的配置文件，改成作为 Vite 插件运行。不加这个，Tailwind 的 class 不会生效
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
// 告诉 Vite：同时开启这两个插件    
export default defineConfig({
  plugins: [react() ,tailwindcss()],
})


