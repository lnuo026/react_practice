
//  Tailwind v4 不再用独立的配置文件，改成作为 Vite 插件运行。不加这个，Tailwind 的 class 不会生效
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ,tailwindcss()],
})


