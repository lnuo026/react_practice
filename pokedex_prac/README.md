# Pokedex Practice — COMPSCI 732

跟着老师 Andrew Meads 的 CS732 课程练习项目，一步步从纯前端静态页面构建成完整的 MERN 全栈应用。

参考原版：https://github.com/UOA-CS732-SE750-Students-2026/cs732-pokedex-demo

## 技术栈
- 前端：React + Vite
- 后端：Node.js + Express
- 数据库：MongoDB + Mongoose
- 包管理：npm workspaces（Monorepo）

---

## 纯前端阶段

- **04-step-00-starting-point**：空白 React 项目起始点
- **04-step-01-copyStaticCode**：把静态 HTML/CSS 复制进 React，以单个组件形式存在 App.jsx
- **04-step-02-static-components**：把 App.jsx 拆分成多个组件，数据暂时硬编码
- **04-step-03-use-dummyData**：用 dummy-data.js 替代硬编码数据，练习 props 传递
- **04-step-05-interactivity**：添加交互功能——按名字搜索宝可梦、点击选中、切换普通/闪光图
- **04-step-06-api**：接入真实外部 API，用 fetch 获取宝可梦数据替代假数据
- **04-step-07-image-load**：切换宝可梦时显示占位图，处理图片加载中的状态

外部 API：`https://pkserve.ocean.anhydrous.dev/api/pokedex`
- `GET /?gen={gen}`：获取某一世代所有宝可梦名字和图鉴编号
- `GET /{dexNumber}`：获取某只宝可梦的完整信息

---

## 全栈阶段（加入后端 + 数据库）

- **04-step-08-monorepoExpress**：把前端移入 frontend/ 文件夹，新建 backend/ 文件夹搭建 Express 框架，用 npm workspaces 组成 Monorepo 结构
- **04-step-09-routes**：用 Express Router 搭建后端 API 路由骨架，前端用 fetch 向后端发请求，Mongoose 查询数据库返回数据

---

## 学习进度
- [x] step-00 ~ step-09 已完成
- [ ] step-10：MongoDB Schema（Mongoose）
- [ ] step-11：完整 Pokedex API
- [ ] step-12：TanStack Query（useQuery）
- [ ] step-13：收藏功能前端
- [ ] step-14：收藏功能后端 API
- [ ] step-15：useMutation Hook

---

## 运行方式

后端和前端都需要配置环境变量，参考各自目录下的 `.env.example` 文件创建 `.env`。

```bash
# 根目录安装所有依赖（前端+后端）
npm install

# 同时启动前端和后端
npm run dev
```
