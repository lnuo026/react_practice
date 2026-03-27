# quiz-app 完整开发计划（4 Sprint · 逐步执行版）

## 项目概述

**项目名**：quiz-app（记忆力游戏平台）
**路径**：/Users/a11111/WorkSpace/react/example_practice/example_practice/quiz-app
**目标**：真实生产级全栈 Web 应用

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React + TypeScript + Vite + Tailwind + Framer Motion + Zustand |
| 认证 | Firebase Auth（Google OAuth）|
| 后端 | NestJS + RESTful API |
| 数据库 | MongoDB Atlas + Mongoose |
| CI/CD | GitHub Actions |
| 部署 | AWS Amplify（前端）+ AWS Elastic Beanstalk（后端）|

---

## Sprint 1 ✅ 已完成

已完成的文件：
- `frontend/src/lib/firebase.ts`
- `frontend/src/store/authStore.ts`
- `frontend/src/pages/LoginPage.tsx`
- `frontend/src/pages/HomePage.tsx`
- `frontend/src/components/ProtectedRoute.tsx`
- `frontend/src/App.tsx`
- `frontend/src/main.tsx`
- `frontend/.env`

---

## Sprint 2（Apr 6–Apr 26）— 后端 + 数据库

### 目标
NestJS 后端跑起来，连上 MongoDB Atlas，前端登录后把用户信息存到数据库。

---

### 第 1 步：MongoDB Atlas 配置（浏览器操作）

1. 打开 cloud.mongodb.com，用 Google 账号注册/登录
2. 点 **"Build a Cluster"** → 选 **Free（M0）**→ 选 AWS 区域（选 Sydney 或 Singapore）→ 点 **"Create"**
3. 左边菜单 **"Database Access"** → **"Add New Database User"**
   - 用户名：`quizapp-admin`
   - 密码：自己设一个，**记下来**
   - 权限：Atlas admin


  
4. 左边菜单 **"Network Access"** → **"Add IP Address"** → 点 **"Allow Access from Anywhere"**（`0.0.0.0/0`）→ Confirm
5. 左边菜单 **"Database"** → 点 **"Connect"** → **"Drivers"** → 复制连接字符串，类似：
![alt text](image.png)
### mongodb+srv://hammer123:hammer111@hammer.xe28mpb.mongodb.net/?appName=quizapp



   ```
   mongodb+srv://quizapp-admin:<password>@cluster0.xxxxx.mongodb.net/
   ```
   把 `<password>` 替换成你的密码，末尾加上数据库名：
   ```
   mongodb+srv://quizapp-admin:你的密码@cluster0.xxxxx.mongodb.net/quizapp
   ```
   **保存这个字符串，下一步要用**

---

### 第 2 步：安装后端依赖




```bash
cd /Users/a11111/WorkSpace/react/example_practice/example_practice/quiz-app/backend
npm install @nestjs/mongoose mongoose @nestjs/config firebase-admin
```

**安装了什么：**
- `@nestjs/mongoose` — NestJS 的 Mongoose 集成
- `mongoose` — 连接 MongoDB 的工具
- `@nestjs/config` — 读取 .env 文件
- `firebase-admin` — 后端验证 Firebase token

---

### 第 3 步：创建后端 .env 文件

在 `backend/` 下新建 `.env`，填入：

```
MONGODB_URI=mongodb+srv://quizapp-admin:你的密码@cluster0.xxxxx.mongodb.net/quizapp
FIREBASE_PROJECT_ID=quizapp-guuuuda
PORT=3001
```

---

### 第 4 步：创建目录结构

在 `backend/src/` 下新建以下文件夹：
```
src/
├── auth/
├── users/
└── game/
```

---

### 第 5 步：Firebase Admin 初始化（auth/firebase-admin.ts）
```
前端和后端各初始化一次 Firebase，但用途完全不同：

  ---
  前端的 firebase.ts（你已经做了）

  import { initializeApp } from 'firebase/app'
  import { getAuth, GoogleAuthProvider } from 'firebase/auth'

  - 用的是普通 Firebase SDK
  - 作用：让用户登录，弹出 Google 选账号窗口
  - 权限：只能做用户能做的事（登录、登出）

  ---
  后端的 firebase-admin.ts（第 5 步）

  import * as admin from 'firebase-admin'

  - 用的是 Firebase Admin SDK
  - 作用：验证用户发来的 token 是否真实
  - 权限：管理员级别，可以验证任意用户的 token

  ---
  类比：

  前端 Firebase   = 门口的身份证读卡机（让你刷卡进门）
  后端 Firebase Admin = 安保系统（验证这张身份证是不是真的）

  ---
  流程：
  前端登录 → Firebase 给用户一个 token（相当于临时通行证）
      ↓
  用户请求后端 API，带上这个 token
      ↓
  后端用 Firebase Admin 验证这个 token 是不是真的
      ↓
  真的 → 放行；假的 → 拒绝

  两边都需要，缺一不可。
```
新建 `backend/src/auth/firebase-admin.ts`：

```ts
import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  })
}

export { admin }
```

---

### 第 6 步：Token 验证守卫（auth/auth.guard.ts）

新建 `backend/src/auth/auth.guard.ts`：

```ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { admin } from './firebase-admin'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('缺少 token')
    }

    const token = authHeader.split('Bearer ')[1]

    try {
      const decoded = await admin.auth().verifyIdToken(token)
      request.user = decoded
      return true
    } catch {
      throw new UnauthorizedException('token 无效')
    }
  }
}
```

---

### 第 7 步：Auth 模块（auth/auth.module.ts）

新建 `backend/src/auth/auth.module.ts`：

```ts
import { Module } from '@nestjs/common'
import { AuthGuard } from './auth.guard'

@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
```

---

### 第 8 步：User 数据模型（users/user.schema.ts）

新建 `backend/src/users/user.schema.ts`：

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  uid: string

  @Prop({ required: true })
  email: string

  @Prop()
  displayName: string

  @Prop()
  photoURL: string

  @Prop({ default: Date.now })
  lastLogin: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
```

---

### 第 9 步：User 服务（users/users.service.ts）

新建 `backend/src/users/users.service.ts`：

```ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 登录时调用：存在则更新，不存在则新建
  async upsert(userData: {
    uid: string
    email: string
    displayName: string
    photoURL: string
  }): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { uid: userData.uid },
      { ...userData, lastLogin: new Date() },
      { upsert: true, new: true }
    )
  }

  // 获取所有用户（管理员用）
  async findAll(): Promise<User[]> {
    return this.userModel.find().sort({ lastLogin: -1 })
  }

  // 获取单个用户
  async findByUid(uid: string): Promise<User> {
    return this.userModel.findOne({ uid })
  }
}
```

---

### 第 10 步：User 控制器（users/users.controller.ts）

新建 `backend/src/users/users.controller.ts`：

```ts
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users/login — 前端登录后调用，存用户到数据库
  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Req() req) {
    const { uid, email, name, picture } = req.user
    return this.usersService.upsert({
      uid,
      email,
      displayName: name,
      photoURL: picture,
    })
  }

  // GET /users/me — 获取当前用户信息
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    return this.usersService.findByUid(req.user.uid)
  }

  // GET /users — 获取所有登录过的用户
  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.usersService.findAll()
  }
}
```

---

### 第 11 步：User 模块（users/users.module.ts）

新建 `backend/src/users/users.module.ts`：

```ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User, UserSchema } from './user.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

---

### 第 12 步：GameSession 数据模型（game/game-session.schema.ts）

新建 `backend/src/game/game-session.schema.ts`：

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type GameSessionDocument = GameSession & Document

@Schema({ timestamps: true })
export class GameSession {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  score: number

  @Prop({ required: true })
  level: number

  @Prop({ default: 0 })
  duration: number

  @Prop({ default: Date.now })
  playedAt: Date
}

export const GameSessionSchema = SchemaFactory.createForClass(GameSession)
```

---

### 第 13 步：Game 服务（game/game.service.ts）

新建 `backend/src/game/game.service.ts`：

```ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { GameSession, GameSessionDocument } from './game-session.schema'

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameSession.name)
    private gameModel: Model<GameSessionDocument>
  ) {}

  async saveSession(data: {
    userId: string
    score: number
    level: number
    duration: number
  }): Promise<GameSession> {
    return this.gameModel.create(data)
  }

  async getHistory(userId: string): Promise<GameSession[]> {
    return this.gameModel
      .find({ userId })
      .sort({ playedAt: -1 })
      .limit(20)
  }
}
```

---

### 第 14 步：Game 控制器（game/game.controller.ts）

新建 `backend/src/game/game.controller.ts`：

```ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { GameService } from './game.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // POST /game/session — 保存一局游戏记录
  @Post('session')
  @UseGuards(AuthGuard)
  async saveSession(
    @Req() req,
    @Body() body: { score: number; level: number; duration: number }
  ) {
    return this.gameService.saveSession({
      userId: req.user.uid,
      ...body,
    })
  }

  // GET /game/history — 获取当前用户游戏历史
  @Get('history')
  @UseGuards(AuthGuard)
  async getHistory(@Req() req) {
    return this.gameService.getHistory(req.user.uid)
  }
}
```

---

### 第 15 步：Game 模块（game/game.module.ts）

新建 `backend/src/game/game.module.ts`：

```ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GameController } from './game.controller'
import { GameService } from './game.service'
import { GameSession, GameSessionSchema } from './game-session.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameSession.name, schema: GameSessionSchema },
    ]),
    AuthModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
```

---

### 第 16 步：更新 app.module.ts

**全部替换** `backend/src/app.module.ts`：

```ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { GameModule } from './game/game.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    GameModule,
  ],
})
export class AppModule {}
```

---

### 第 17 步：更新 main.ts（开启 CORS）

**全部替换** `backend/src/main.ts`：

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
```

---
解释为什么要回前端。                                         
                                                                         
  ---                                                        
  前后端现在的状态                                                       
                                                                         
  后端 ✅ 已经写好了                                                     
    - POST /users/login   → 存用户到数据库                               
    - GET  /users/me      → 查当前用户                                   
    - POST /game/session  → 存游戏记录                      
    - GET  /game/history  → 查历史记录                                   
                                                                         
  前端 ❌ 还没有任何代码去调用这些接口        
                                                                         
  后端写好了，但前端完全不知道后端存在，两边还没有连起来。  
                                                                         
  ---                                                       
  api.ts 是干什么的                                                      
                                                            
  就是前端专门用来和后端通话的工具文件。                                 
                                                            
  前端页面                                
     ↓ 调用                                   
  api.ts（统一管理所有后端请求）                                         
     ↓ 发 HTTP 请求                           
  后端接口                                                               
     ↓ 查询                                                 
  MongoDB 数据库           
api.ts 把这些重复的东西封装一次，其他地方直接调用：
                                                                         
  // 有了 api.ts 之后，任何组件只需要一行
  await apiFetch('/users/login', { method: 'POST' })                     
                                                            
  token 的获取、URL 的拼接、headers 的设置，全都在 api.ts                
  里统一处理好了。 


---




### 第 18 步：前端新建 api.ts（lib/api.ts）

新建 `frontend/src/lib/api.ts`：

```ts
import { auth } from './firebase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function apiFetch(path: string, options: RequestInit = {}) {
  const user = auth.currentUser
  const token = user ? await user.getIdToken() : null

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  return res.json()
}
```

---

### 第 19 步：前端更新 LoginPage.tsx

登录成功后，额外调用后端保存用户：

```tsx
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export default function LoginPage() {
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    setUser(result.user)

    // 把用户信息存到自己的后端数据库
    await apiFetch('/users/login', { method: 'POST' })

    navigate('/home')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <h1>QuizApp</h1>
      <button onClick={handleLogin}>使用 Google 登录</button>
    </div>
  )
}
```
![alt text](image-1.png)
---

### 第 20 步：启动后端，联调测试

```bash
cd backend
npm run start:dev
```

然后前端也启动：
```bash
cd frontend
npm run dev
```

用 Google 登录后，到 MongoDB Atlas → Browse Collections，应该能看到 `users` 集合里有你的用户记录。

---

## Sprint 3（Apr 27–May 6）— GitHub Actions CI/CD

### 目标
每次 push 代码到 GitHub，自动运行代码检查和构建，确保代码不出错。

---

### 第 1 步：在 GitHub 设置 Secrets

打开 github.com → react_practice 仓库 → Settings → Secrets and variables → Actions → New repository secret，添加：

| 名称 | 值 |
|------|------|
| `MONGODB_URI` | 你的 MongoDB 连接字符串 |
| `FIREBASE_PROJECT_ID` | `quizapp-guuuuda` |

---

### 第 2 步：前端 CI 配置

新建文件 `.github/workflows/frontend-ci.yml`：

```yaml
name: Frontend CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: quiz-app/frontend

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: quiz-app/frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
```

---

### 第 3 步：后端 CI 配置

新建文件 `.github/workflows/backend-ci.yml`：

```yaml
name: Backend CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: quiz-app/backend

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: quiz-app/backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
```

---

### 第 4 步：把 .github/workflows 推到 GitHub

```bash
cd /Users/a11111/WorkSpace/react/example_practice/example_practice
git add .github/
git commit -m "add GitHub Actions CI for frontend and backend"
git push
```

打开 GitHub → Actions 标签，应该能看到 CI 在跑。

---

## Sprint 4（May 7–May 13）— AWS 部署上线

### 目标
前端部署到 AWS Amplify（公网可访问），后端部署到 AWS Elastic Beanstalk。

---

### 第 1 步：注册 AWS 账号

打开 aws.amazon.com → 注册账号（需要信用卡，但 Free Tier 不收费）
- 学生可以申请 AWS Educate，获得免费额度

---

### 第 2 步：前端部署到 AWS Amplify

1. 打开 AWS Console → 搜索 **Amplify** → 点进去
2. 点 **"Create new app"** → **"GitHub"** → 授权 GitHub
3. 选 `react_practice` 仓库，分支选 `main`
4. 在 App settings 里设置：
   - Root directory：`quiz-app/frontend`
   - Build command：`npm run build`
   - Output directory：`dist`
5. 点 **"Advanced settings"** → 添加环境变量（.env 里的 VITE_ 变量全部填进去）
6. 点 **"Save and deploy"**
7. 等几分钟，拿到公网地址：`https://xxx.amplifyapp.com`

---

### 第 3 步：后端添加 Procfile

在 `backend/` 目录下新建 `Procfile`（无后缀名）：

```
web: node dist/main.js
```

---

### 第 4 步：后端部署到 AWS Elastic Beanstalk

```bash
# 安装 EB CLI
pip3 install awsebcli

# 进入后端目录
cd /Users/a11111/WorkSpace/react/example_practice/example_practice/quiz-app/backend

# 先构建
npm run build

# 初始化 EB
eb init quiz-app-backend --platform node.js --region ap-southeast-2

# 创建环境（第一次部署）
eb create quiz-app-backend-prod

# 设置环境变量
eb setenv MONGODB_URI="你的连接字符串" FIREBASE_PROJECT_ID="quizapp-guuuuda" PORT=8080

# 部署
eb deploy
```

拿到后端地址：`https://quiz-app-backend-prod.ap-southeast-2.elasticbeanstalk.com`

---

### 第 5 步：前端更新 API 地址

在 `frontend/` 下新建 `.env.production`：

```
VITE_API_URL=https://你的后端地址.elasticbeanstalk.com
```

---

### 第 6 步：后端更新 CORS 允许前端域名

修改 `backend/src/main.ts` 的 CORS 设置：

```ts
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://xxx.amplifyapp.com',  // 你的 Amplify 地址
  ],
  credentials: true,
})
```

---

### 第 7 步：Firebase 授权域名

打开 Firebase Console → Authentication → Settings → 授权域名 → 添加：
- `xxx.amplifyapp.com`（你的 Amplify 地址）

否则 Google 登录会报错。

---

### 第 8 步：重新部署前端

```bash
cd /Users/a11111/WorkSpace/react/example_practice/example_practice
git add .
git commit -m "update production config"
git push
```

Amplify 会自动检测到 push，自动重新部署。

---

## 最终验证

打开 `https://xxx.amplifyapp.com`，应该能：
1. 看到登录页面
2. 用 Google 账号登录
3. 跳转首页显示名字
4. MongoDB Atlas 里出现用户记录

---

## 完整数据流

```
用户访问 amplifyapp.com（前端）
    ↓
点"Google 登录" → Firebase 弹窗 → Google 验证
    ↓
Firebase 返回 token 给前端
    ↓
前端带 token 请求 elasticbeanstalk.com/users/login
    ↓
NestJS 的 AuthGuard 验证 token
    ↓
UsersService 把用户存入 MongoDB Atlas
    ↓
前端跳转首页，显示用户名
```
----
```
 注入 = NestJS 自动帮你创建对象并传递给需要它
  的地方，你不用自己 new。

  这个概念叫依赖注入（DI），是后端框架的核心设计
  思想，知道这个意思就够了
```

---

## ✅ Sprint 1 + 2 已完成

- Google OAuth 登录
- NestJS 后端 + MongoDB 全链路
- 用户数据写入数据库

---

## Sprint 3 — 游戏核心 + UI 重设计

### UI 参考风格
- **Dashboard** → 参考 Round Tracker Pro：白色背景，彩色渐变统计卡片（浅蓝/浅绿/浅粉/浅黄），recharts 图表
- **游戏页** → 参考 Bluff Battle：大字体，粗边框卡片，鲜明色彩，Framer Motion 动画
- **首页/登录** → 居中卡片，渐变背景，入场动画

### 游戏玩法（序列回想）
```
1. 屏幕依次闪出数字（1-9），每个显示 800ms + Framer Motion 动画
2. 全部显示完 → 用户点击 3×3 数字网格输入序列
3. 全对 → level+1（序列更长）；错误 → level-1
4. 10 轮结束 → SessionSummary 显示得分/准确率
```

---

### 第 21 步：后端扩展 GameSession Schema

修改 `backend/src/game/game-sessionSchema.ts`，追加两个字段：

```ts
@Prop({ default: 0 })
accuracy: number   // 本局答对率 0-100

@Prop({ default: 0 })
totalRounds: number  // 本局总轮数
```

---

### 第 22 步：后端 Game Service 新增 getStats

修改 `backend/src/game/service.ts`，追加方法：

```ts
async getStats(userId: string) {
  const sessions = await this.gameModel.find({ userId }).sort({ playedAt: -1 }).limit(20)
  if (!sessions.length) return { bestLevel: 0, avgAccuracy: 0, totalSessions: 0 }
  return {
    bestLevel: Math.max(...sessions.map(s => s.level)),
    avgAccuracy: Math.round(sessions.reduce((a, s) => a + s.accuracy, 0) / sessions.length),
    totalSessions: sessions.length,
    recentSessions: sessions.slice(0, 10),
  }
}
```

修改 `saveSession()` 接收 accuracy 和 totalRounds：

```ts
async saveSession(data: {
  userId: string; score: number; level: number;
  duration: number; accuracy: number; totalRounds: number
}): Promise<GameSession> {
  return this.gameModel.create(data)
}
```

---

### 第 23 步：后端 Game Controller 新增 /stats 端点

修改 `backend/src/game/controller.ts`，追加：

```ts
@Get('stats')
@UseGuards(AuthGuard)
async getStats(@Req() req) {
  return this.gameService.getStats(req.user.uid)
}
```

修改 `saveSession` body 类型接收新字段：

```ts
@Body() body: { score: number; level: number; duration: number; accuracy: number; totalRounds: number }
```

---

### 第 24 步：前端新建 gameStore

新建 `frontend/src/store/gameStore.ts`：

```ts
import { create } from 'zustand'

type Phase = 'idle' | 'showing' | 'input' | 'feedback' | 'summary'

interface GameState {
  phase: Phase
  sequence: number[]
  userInput: number[]
  level: number
  score: number
  round: number
  correctRounds: number
  startGame: () => void
  setSequence: (seq: number[]) => void
  addInput: (num: number) => void
  clearInput: () => void
  setPhase: (phase: Phase) => void
  nextRound: (correct: boolean) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'idle',
  sequence: [],
  userInput: [],
  level: 3,
  score: 0,
  round: 0,
  correctRounds: 0,

  startGame: () => set({ phase: 'showing', round: 1, score: 0, correctRounds: 0, level: 3, userInput: [] }),
  setSequence: (seq) => set({ sequence: seq }),
  addInput: (num) => set(s => ({ userInput: [...s.userInput, num] })),
  clearInput: () => set({ userInput: [] }),
  setPhase: (phase) => set({ phase }),
  nextRound: (correct) => set(s => ({
    score: correct ? s.score + s.level * 10 : s.score,
    correctRounds: correct ? s.correctRounds + 1 : s.correctRounds,
    level: correct ? Math.min(s.level + 1, 9) : Math.max(s.level - 1, 2),
    round: s.round + 1,
    userInput: [],
    phase: s.round >= 10 ? 'summary' : 'showing',
  })),
  resetGame: () => set({ phase: 'idle', sequence: [], userInput: [], level: 3, score: 0, round: 0, correctRounds: 0 }),
}))
```

---

### 第 25 步：前端新建游戏组件

**新建 `frontend/src/components/game/SequenceDisplay.tsx`**

用 Framer Motion 依次显示数字，每个数字出现 800ms 后消失：

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  sequence: number[]
  onDone: () => void
}

export default function SequenceDisplay({ sequence, onDone }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= sequence.length) { onDone(); return }
    const timer = setTimeout(() => setIndex(i => i + 1), 900)
    return () => clearTimeout(timer)
  }, [index, sequence, onDone])

  return (
    <div className="flex items-center justify-center h-48">
      <AnimatePresence mode="wait">
        {index < sequence.length && (
          <motion.div
            key={index}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-8xl font-bold text-indigo-400"
          >
            {sequence[index]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

**新建 `frontend/src/components/game/InputGrid.tsx`**

3×3 数字点击网格：

```tsx
interface Props {
  onInput: (num: number) => void
  userInput: number[]
  maxLength: number
}

export default function InputGrid({ onInput, userInput, maxLength }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 w-64 mx-auto">
      {[1,2,3,4,5,6,7,8,9].map(n => (
        <button
          key={n}
          onClick={() => userInput.length < maxLength && onInput(n)}
          className="h-16 text-2xl font-bold rounded-xl bg-white/10 hover:bg-indigo-500 border border-white/20 transition-all"
        >
          {n}
        </button>
      ))}
    </div>
  )
}
```

**新建 `frontend/src/components/game/SessionSummary.tsx`**

游戏结束总结页，显示得分/准确率，保存到后端：

```tsx
import { useEffect } from 'react'
import { apiFetch } from '../../lib/api'

interface Props {
  score: number
  correctRounds: number
  totalRounds: number
  level: number
  onRestart: () => void
}

export default function SessionSummary({ score, correctRounds, totalRounds, level, onRestart }: Props) {
  const accuracy = Math.round((correctRounds / totalRounds) * 100)

  useEffect(() => {
    apiFetch('/game/session', {
      method: 'POST',
      body: JSON.stringify({ score, level, duration: 0, accuracy, totalRounds }),
    })
  }, [])

  return (
    <div className="text-center space-y-6">
      <h2 className="text-4xl font-bold text-white">游戏结束</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded-2xl p-4">
          <p className="text-3xl font-bold text-blue-700">{score}</p>
          <p className="text-sm text-blue-500">得分</p>
        </div>
        <div className="bg-green-100 rounded-2xl p-4">
          <p className="text-3xl font-bold text-green-700">{accuracy}%</p>
          <p className="text-sm text-green-500">准确率</p>
        </div>
        <div className="bg-purple-100 rounded-2xl p-4">
          <p className="text-3xl font-bold text-purple-700">{level}</p>
          <p className="text-sm text-purple-500">最终等级</p>
        </div>
      </div>
      <button onClick={onRestart} className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600">
        再来一局
      </button>
    </div>
  )
}
```

---

### 第 26 步：前端新建 GamePage

新建 `frontend/src/pages/GamePage.tsx`：

```tsx
import { useEffect, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import SequenceDisplay from '../components/game/SequenceDisplay'
import InputGrid from '../components/game/InputGrid'
import SessionSummary from '../components/game/SessionSummary'

function generateSequence(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1)
}

export default function GamePage() {
  const { phase, sequence, userInput, level, score, round, correctRounds,
          startGame, setSequence, addInput, setPhase, nextRound, resetGame } = useGameStore()

  // 每次进入 showing 阶段，生成新序列
  useEffect(() => {
    if (phase === 'showing') setSequence(generateSequence(level))
  }, [phase, level, round])

  const handleSequenceDone = useCallback(() => setPhase('input'), [])

  const handleInput = useCallback((num: number) => {
    addInput(num)
    const newInput = [...userInput, num]
    if (newInput.length === sequence.length) {
      const correct = newInput.every((v, i) => v === sequence[i])
      setPhase('feedback')
      setTimeout(() => nextRound(correct), 1000)
    }
  }, [userInput, sequence])

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center p-6 text-white">
      {/* 顶部状态栏 */}
      <div className="flex gap-8 mb-8 text-lg">
        <span>第 {round}/10 轮</span>
        <span>等级 {level}</span>
        <span>得分 {score}</span>
      </div>

      {phase === 'idle' && (
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold">序列回想</h1>
          <p className="text-gray-400">记住数字出现的顺序，然后按顺序点击</p>
          <button onClick={startGame} className="px-10 py-4 bg-indigo-500 rounded-2xl text-xl font-bold hover:bg-indigo-600">
            开始游戏
          </button>
        </div>
      )}

      {phase === 'showing' && (
        <div className="text-center">
          <p className="text-gray-400 mb-4">记住这些数字...</p>
          <SequenceDisplay sequence={sequence} onDone={handleSequenceDone} />
        </div>
      )}

      {phase === 'input' && (
        <div className="text-center space-y-6">
          <p className="text-xl text-gray-300">按顺序点击数字</p>
          <div className="text-2xl tracking-widest text-indigo-400 h-8">
            {userInput.map((n, i) => <span key={i}>{n} </span>)}
          </div>
          <InputGrid onInput={handleInput} userInput={userInput} maxLength={sequence.length} />
        </div>
      )}

      {phase === 'feedback' && (
        <div className="text-center">
          <p className="text-4xl">
            {JSON.stringify(userInput) === JSON.stringify(sequence) ? '✅ 正确！' : '❌ 错误'}
          </p>
        </div>
      )}

      {phase === 'summary' && (
        <SessionSummary
          score={score} correctRounds={correctRounds}
          totalRounds={10} level={level}
          onRestart={resetGame}
        />
      )}
    </div>
  )
}
```

---

### 第 27 步：前端新建 DashboardPage

安装 recharts：`cd frontend && npm install recharts`

新建 `frontend/src/pages/DashboardPage.tsx`：

```tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { apiFetch } from '../lib/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)
  const navigate = useNavigate()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    apiFetch('/game/stats').then(setStats)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 顶部欢迎栏 */}
      <div className="flex items-center gap-4 mb-8">
        <img src={user?.photoURL || ''} className="w-12 h-12 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">你好，{user?.displayName}</h1>
          <p className="text-gray-500">准备好训练了吗？</p>
        </div>
        <button
          onClick={() => navigate('/game')}
          className="ml-auto px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600"
        >
          开始训练
        </button>
      </div>

      {/* 统计卡片（参考 Round Tracker Pro 风格） */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-2xl p-6">
          <p className="text-sm text-blue-500 font-medium uppercase tracking-wide">最高等级</p>
          <p className="text-4xl font-bold text-blue-700 mt-1">{stats?.bestLevel ?? '-'}</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6">
          <p className="text-sm text-green-500 font-medium uppercase tracking-wide">平均准确率</p>
          <p className="text-4xl font-bold text-green-700 mt-1">{stats?.avgAccuracy ?? '-'}%</p>
        </div>
        <div className="bg-pink-50 rounded-2xl p-6">
          <p className="text-sm text-pink-500 font-medium uppercase tracking-wide">总局数</p>
          <p className="text-4xl font-bold text-pink-700 mt-1">{stats?.totalSessions ?? '-'}</p>
        </div>
      </div>

      {/* 折线图 */}
      {stats?.recentSessions?.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-700 mb-4">近期得分趋势</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[...stats.recentSessions].reverse()}>
              <XAxis dataKey="playedAt" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
```

---

### 第 28 步：更新路由 App.tsx

修改 `frontend/src/App.tsx`，加入新路由：

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import GamePage from './pages/GamePage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/game" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### 第 29 步：重做 LoginPage UI（Tailwind + Framer Motion）

修改 `frontend/src/pages/LoginPage.tsx`：

```tsx
import { motion } from 'framer-motion'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export default function LoginPage() {
  const setUser = useAuthStore(s => s.setUser)
  const navigate = useNavigate()

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    setUser(result.user)
    await apiFetch('/users/login', { method: 'POST' })
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-10 text-center text-white w-96 border border-white/20"
      >
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-4xl font-bold mb-2">FocusForge</h1>
        <p className="text-gray-300 mb-8">训练你的工作记忆，提升专注力</p>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
        >
          使用 Google 登录
        </button>
      </motion.div>
    </div>
  )
}
```

---

### 第 30 步：测试验证

```bash
# 后端（已在跑）
cd backend && npm run start:dev

# 前端
cd frontend && npm run dev
```

验证：
1. 登录页有渐变背景 + 入场动画
2. 能正常 Google 登录 → 跳转 Dashboard
3. Dashboard 显示统计卡片
4. 点"开始训练" → 进入游戏页
5. 完成一局 → MongoDB 有新记录（含 accuracy 字段）
6. 回到 Dashboard → 图表有数据

---

## Sprint 4 — GitHub Actions + AWS 部署（同原计划）

参考文件上方 Sprint 3（原）和 Sprint 4 章节，步骤不变：
1. GitHub Actions CI（frontend-ci.yml + backend-ci.yml）
2. 前端 → AWS Amplify
3. 后端 → AWS Elastic Beanstalk
4. 收尾：CORS + Firebase 授权域名
