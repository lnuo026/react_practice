# Workout Tracker — TypeScript + React 学习项目
## 学习note

> 从零基础出发，通过做一个真实的锻炼追踪 App 来学习 TypeScript 和 React。
> 每一步都先理解原理，再动手写代码。

---

## 技术栈

| 工具 | 用途 |
|------|------|
| React 19 | 构建 UI 界面 |
| TypeScript 5 | 给 JavaScript 加类型检查 |
| Vite | 开发服务器 + 打包工具 |
| TailwindCSS v4 | 样式（用 class 名写 CSS） |

---

## 启动项目

```bash
npm install      # 安装依赖（只需要第一次）
npm run dev      # 启动开发服务器，打开 http://localhost:5173
```

---

## 项目功能设计

这个 App 要实现的 5 个功能：

1. 添加一条训练记录（日期 + 动作 + 组数 + 次数 + 重量）
2. 查看所有记录列表
3. 查找某个动作的历史记录
4. 计算某个动作的个人最佳重量（Personal Best）
5. 计算本周总训练次数

---

## 学习路线（已完成）

### 阶段 0 — 环境搭建

**创建项目：**
```bash
npm create vite@latest workout-tracker -- --template react-ts
```
`--template react-ts` 表示用 React + TypeScript 模板。

**安装 Tailwind：**
```bash
npm install -D @tailwindcss/vite
```
- `npm install` → 安装包
- `-D` → 只在开发时用，打包上线不需要（devDependency）
- 对比：`npm install react` 是运行时也需要的普通依赖

**修改 `vite.config.ts`，加入 Tailwind 插件：**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← 加这行

export default defineConfig({
  plugins: [react(), tailwindcss()],           // ← 加 tailwindcss()
})
```
为什么要这样做：Tailwind v4 不再用独立配置文件，改成作为 Vite 插件运行。不加这个，所有 Tailwind class 都不会生效。

**全局 CSS（`src/index.css`）：**
```css
@import "tailwindcss";

@theme {
  --font-pixel: 'Press Start 2P', cursive;   /* 自定义像素字体 */
}

body { margin: 0; }
```
- `@import "tailwindcss"` — Tailwind v4 的启动方式，没有这行所有 class 都无效
- `@theme` — 定义自己的设计变量（比如自定义字体）

---

### 阶段 1 — TypeScript 类型系统

**联合类型（Union Type）：**
```ts
type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms'
```
`muscleGroup` 字段只能是这 5 个字符串之一。写其他值 TypeScript 直接报错。

**Interface — 定义数据的形状：**
```ts
interface WorkoutLog {
  id: number
  date: string
  exercise: string
  muscleGroup: MuscleGroup   // ← 用上面定义的联合类型
  sets: number
  reps: number
  weightKg: number
  note?: string              // ← ? 表示可选，可以有也可以没有
}
```
就像 Java 的 class，但只描述结构，不能 `new`。每个字段都必须有，缺一个 TS 报错。

**TypeScript 定义类型的三种方式：**

| 方式 | 语法 | 适合用在 |
|------|------|---------|
| `interface` | `interface WorkoutLog { }` | 描述对象的结构（字段） |
| `type` | `type MuscleGroup = 'a' \| 'b'` | 联合类型、别名 |
| `class` | `class Animal { }` | 真实存在、可以 `new` 的对象 |

**重要：interface 和 type 运行时会消失**
```ts
// 你写的 TypeScript
const log: WorkoutLog = { id: 1, ... }

// 编译成 JavaScript 之后
const log = { id: 1, ... }   // WorkoutLog 这个词完全消失了
```
浏览器只认 JavaScript，interface 只是给开发者和 TS 编译器看的。

**interface 的三个作用：**
1. 方便人看（可读性）
2. 方便 TypeScript 在运行前就发现错误
3. 方便复用（定义一次，到处用）

---

### 阶段 2 — TypeScript 函数

```ts
type Grade = 'S' | 'A' | 'B' | 'C'

function getGrade(weightKg: number): Grade {
  if (weightKg >= 100) return 'S'
  else if (weightKg >= 80) return 'A'
  else if (weightKg >= 60) return 'B'
  else return 'C'
}
```

- `(weightKg: number)` — 参数类型标注，传进来必须是数字
- `: Grade` — 返回值类型标注，函数必须返回 'S'/'A'/'B'/'C' 之一，返回其他值 TS 报错

---

### 阶段 3 — 数组方法（JS 核心）

**为什么要把 `exercise` 单独传参？**
```ts
function filterByExercise(logs: WorkoutLog[], exercise: string): WorkoutLog[]
//                         ↑ 数据                ↑ 筛选条件
```
- `logs` 是所有训练记录（数据）
- `exercise` 是你要查哪个动作（条件）
- 同一个 `logs` 数组，传不同的 `exercise`，得到不同结果

**`.filter()` — 筛选数组：**
```ts
function filterByExercise(logs: WorkoutLog[], exercise: string): WorkoutLog[] {
  return logs.filter(log => log.exercise === exercise.toLowerCase())
}
```
`.filter()` 接收一个函数，返回 true 的元素留下，false 的扔掉。

**`.map()` — 转换数组：**
```ts
const weights = exerciseFilter.map(log => log.weightKg)
// 把 WorkoutLog[] 变成 number[]，只保留重量字段
```

**展开运算符 `...` + `Math.max()`：**
```ts
const best = Math.max(...weights)
// Math.max(80, 85, 90) ← 展开数组，等价于这样传
```

**函数互相调用：**
```ts
function getPersonalBest(logs: WorkoutLog[], exercise: string): number {
  const filtered = filterByExercise(logs, exercise)  // ← 调用上面写的函数
  if (filtered.length === 0) return 0
  const weights = filtered.map(log => log.weightKg)
  return Math.max(...weights)
}
```

---

### 阶段 4 — Date 日期处理

**Date 对象的常用方法：**
```ts
const today = new Date()

today.getDay()       // 星期几（0=周日, 1=周一, 2=周二 ... 6=周六）
today.getDate()      // 几号（1-31）
today.getMonth()     // 几月（0-11，注意从 0 开始！1月是0）
today.getFullYear()  // 哪年（2026）
```

**获取今天的日期字符串：**
```ts
new Date().toISOString()          // → "2026-04-01T14:30:00.000Z"
new Date().toISOString().split('T')    // → ["2026-04-01", "14:30:00.000Z"]
new Date().toISOString().split('T')[0] // → "2026-04-01"
```

**`split('X')` 的含义：**
```ts
"hello world".split(' ')     // → ["hello", "world"]
"a,b,c".split(',')           // → ["a", "b", "c"]
"2026-04-01".split('-')      // → ["2026", "04", "01"]
// 遇到分隔符就切断，结果是数组，取 [0] 就是第一段
```

**字符串日期可以直接比大小：**
```ts
"2026-04-01" >= "2026-03-31"  // → true
// 按字符串字典序比较，格式统一时完全正确
```

**`getWeeklyCount` 完整逻辑：**
```ts
function getWeeklyCount(logs: WorkoutLog[]): number {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  // 周日(0)特殊处理：距离上周一是6天，其他：星期N - 1

  const mondayDate = new Date(today)
  mondayDate.setDate(today.getDate() - daysFromMonday)
  const mondayStr = mondayDate.toISOString().split('T')[0]

  return logs.filter(log => log.date >= mondayStr).length
}
```

---

### 阶段 5 — React useState + 泛型

**为什么空数组要写泛型：**
```ts
useState([])                  // TS 推断：never[]  ← 不知道里面放什么
useState<WorkoutLog[]>([])    // TS 知道：里面放 WorkoutLog 对象
```
初始值是空数组 `[]` 时 TS 猜不出类型，所以要手动告诉它。

**如果初始值能看出类型，就不需要写：**
```ts
useState(1)         // TS 自动推断是 number，不需要写 useState<number>(1)
useState('hello')   // TS 自动推断是 string
useState<MuscleGroup>('chest')  // 但如果要限制只能是 MuscleGroup，就要写
```

**与 Java 的类比：**
```java
// Java
List<WorkoutLog> logs = new ArrayList<>();
```
```ts
// TypeScript
const [logs, setLogs] = useState<WorkoutLog[]>([])
```

**7 个状态变量（对应 App.tsx 里的设计）：**
```ts
const [logs, setLogs]             = useState<WorkoutLog[]>([])  // 所有记录
const [nextId, setNextId]         = useState(1)                  // 下一条记录的 id
const [exercise, setExercise]     = useState('')                 // 输入框：动作名
const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('chest') // 肌肉群
const [sets, setSets]             = useState(3)                  // 组数
const [reps, setReps]             = useState(8)                  // 次数
const [weightKg, setWeightKg]     = useState(60)                 // 重量
const [note, setNote]             = useState('')                 // 备注
```

---

### 阶段 6 — 受控表单 + 事件处理

```tsx
<input
  value={exercise}
  onChange={e => setExercise(e.target.value)}
/>
```

**数据流向：**
```
用户打字
  → 浏览器触发 onChange 事件
  → 把事件对象 e 传进来
  → e.target 是这个输入框元素
  → e.target.value 是输入框里现在的文字
  → setExercise 把状态更新成这个文字
  → React 重新渲染，输入框显示最新值
```
每打一个字触发一次，状态实时更新。

---

### 阶段 7 — handleAdd 函数

```ts
function handleAdd() {
  if (!exercise.trim()) return   // 防空提交

  const newLog: WorkoutLog = {
    id: nextId,
    date: new Date().toISOString().split('T')[0],
    exercise: exercise.trim(),
    muscleGroup: muscleGroup,
    sets: sets,
    reps: reps,
    weightKg: weightKg,
    note: note.trim() || undefined,   // 没填备注就是 undefined
  }

  setLogs(prev => [newLog, ...prev])  // 新记录放最前面
  setNextId(prev => prev + 1)         // id + 1
  setExercise('')                     // 清空输入框
  setNote('')
}
```

**关键细节：**

- `trim()` — 去掉首尾空格，`"  "` 变成 `""` 就是空字符串，防止用户只输入空格
- `note.trim() || undefined` — 备注是可选字段：有内容就用，没有就是 `undefined`
- `setLogs(prev => [newLog, ...prev])` — 函数式更新
  - `prev` = React 传进来的当前状态值（更新之前的 logs）
  - `[newLog, ...prev]` = 新记录放第一位，后面展开所有旧记录

---

### 阶段 8 — 列表渲染 JSX

```tsx
{logs.map(log => (
  <div key={log.id}>
    {log.exercise} - {log.weightKg}kg - {log.date}
  </div>
))}
```

- `.map()` 把数组变成 JSX 元素数组
- `key={log.id}` — React 要求列表里每个元素有唯一的 key，用来识别哪个元素变了


