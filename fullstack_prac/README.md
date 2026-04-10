


## 结构
 fullstack_prac/
  ├── backend/          ← Node.js + Express 后端
  │   ├── src/app.js           ← 服务器入口              
  │   ├── src/data/schema.js   ← MongoDB 数据结构
  │   ├── src/data/articles-dao.js  ← 数据库操作         
  │   ├── src/routes/api/articles.js ← 文章 API        
  │   ├── src/routes/api/images.js   ← 图片 API          
  │   └── public/images/       ← 上传的图片存在这里    
  │                                                      
  └── frontend/         ← React + MUI 前端             
      ├── src/App.jsx              ← 路由总入口          
      ├── src/AppContextProvider.jsx ←                 
  全局状态（Context）                                    
      ├── src/hooks/useGet.js      ← 自定义 Hook       
      ├── src/pages/               ← 各个页面            
      │   ├── ArticlesSummaryPage  ← 文章列表页        
      │   ├── SingleArticlePage    ← 单篇文章页          
      │   ├── GalleryPage          ← 图库页            
      │   └── NewArticlePage       ← 写文章页            
      └── src/components/          ← 可复用组件   


issue
## 我图嘞？ 
😤 mongodb 需要链接： 本地 / docker 
```bash
brew services start mongodb-community  本地ui
```

MongoDB整个流程
连接流程

.env 文件          →    app.js              →    schema.js
DB_URL="mongodb://..."  mongoose.connect()       mongoose.model()
（存连接地址）          （建立连接）
（用连接操作数据）

## 第一步：.env 文件存连接地址
`DB_URL=mongodb://127.0.0.1:27017/blogogog  port 3000` 
- localhost:27017 — MongoDB 跑在本地的地址和端口
- blogogog — 数据库名字


## 第2步： **init-db.js**
- 独立的数据库初始化脚本 ，自己连接 MongoDB、自己断开，专门用来初始化数据用的
    - import "dotenv/config"  // 读取 .env 文件，把里面的变量加载进来
    - await mongoose.connect(process.env.DB_URL)  // 用 DB_URL 连接MongoDB 
    - app.listen(PORT, ...)  // 连接成功之后才启动服务器

  _注意顺序： 先连数据库，连上了才启动服务器。用 await 保证顺序正确。_

文件里面：
 连接数据库
      ↓
  clearDatabase()  → 删掉所有现有文章
      ↓                                                               
  seedDatabase()   → 塞入一批假数据（从 random-articles.js 来）
      ↓                                                               
  断开数据库   

**process.env.DB_URL**
  process.env 是 Node.js 读取环境变量的方式，.DB_URL 就是 .env 文件里写的那个变量名。


## 第3步： **schema.js 定义数据结构**
import mongoose from "mongoose"
const Article = mongoose.model("Article", articleSchema)

mongoose.model() 把 Schema
注册成一个可以操作数据库的模型，之后就可以：

Article.find()      // 查所有文章
Article.create({})  // 创建新文章
Article.findById()  // 查单篇文章




