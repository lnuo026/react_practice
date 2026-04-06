# Expo Router、SvelteKit 对比 & Web React vs React Native 全面对比

> 非常好的问题！你已经有了很好的类比思维。


---

# 1. Expo Router 和 SvelteKit 的文件路由对比

**是的，核心思想完全一样！** 它们都叫 **"File-based Routing"（基于文件的路由）**。

| 特性 | SvelteKit | Expo Router | Next.js（Web React） |
|------|-----------|-------------|---------------------|
| 来源思想 | 首创/推广 | 借鉴 Next.js | 借鉴 SvelteKit |
| 路由文件名 | `+page.svelte` | `index.tsx` | `page.tsx` |
| 布局文件 | `+layout.svelte` | `_layout.tsx` | `layout.tsx` |
| 动态路由 | `[id]` | `[id]` | `[id]` |
| 分组 | `(group)` | `(group)` | `(group)` |

```
思想起源链：
SvelteKit ──影响──→ Next.js App Router ──影响──→ Expo Router
（文件即路由）         （Web React）                （React Native）
```

**三者文件结构对比同一个 App：**

```
SvelteKit:              Next.js:                Expo Router:
src/routes/             app/                    app/
├── +layout.svelte      ├── layout.tsx          ├── _layout.tsx
├── +page.svelte        ├── page.tsx            ├── index.tsx
├── about/              ├── about/              ├── about/
│   └── +page.svelte    │   └── page.tsx        │   └── index.tsx
└── (tabs)/             └── (tabs)/             └── (tabs)/
    └── +layout.svelte      └── layout.tsx          └── _layout.tsx
```

**几乎一模一样！** 你学了一个，另外两个基本上无缝迁移。

---

# 2. Web React vs React Native — 全面对比

## 核心区别：渲染目标不同

```
Web React:
你的代码 → React → 浏览器 DOM → HTML 元素 → 屏幕

React Native:
你的代码 → React → 原生桥接层 → iOS/Android 原生组件 → 屏幕
```

---

## UI 元素对比

| Web React | React Native | 说明 |
|-----------|-------------|------|
| `<div>` | `<View>` | 最基础的容器盒子 |
| `<span>` / `<p>` | `<Text>` | **所有文字必须在 Text 里** |
| `<img>` | `<Image>` | 图片 |
| `<input>` | `<TextInput>` | 输入框 |
| `<button>` | `<TouchableOpacity>` / `<Pressable>` | 可点击区域 |
| `<ul><li>` | `<FlatList>` | 长列表（性能优化版） |
| `<a href>` | `<Link href>` (expo-router) | 导航链接 |
| `<ScrollView>` | `<ScrollView>` | 可滚动容器 |

**React Native 里最容易踩的坑：**
```tsx
// ❌ 错误：文字不能直接放在 View 里
<View>Hello World</View>

// ✅ 正确：必须用 Text 包裹
<View><Text>Hello World</Text></View>
```

---

## 样式系统对比

```
Web React:
- 用 CSS / CSS Modules / Tailwind
- 支持所有 CSS 属性
- 单位：px、em、rem、%...
- 支持伪类 :hover、:focus...

React Native:
- 用 StyleSheet.create() 或内联对象
- 只支持部分 CSS 属性（子集）
- 单位：只有无单位数字（相当于 dp）
- 没有伪类！（hover 等不存在）
```

**代码对比：**

```tsx
// Web React（CSS-in-JS 风格）
<div style={{
  display: 'flex',
  fontSize: '16px',        // 有单位
  backgroundColor: 'red',
  border: '1px solid #000' // ✅ Web 有 border
}}>Hello</div>

// React Native
<View style={{
  flex: 1,                 // 不需要 display:'flex'，默认就是
  fontSize: 16,            // 无单位！
  backgroundColor: 'red',
  // borderWidth: 1,       // border 要拆开写
  // borderColor: '#000',
}}>
  <Text>Hello</Text>       // 文字必须在 Text 里
</View>
```

**React Native 布局默认是 Flexbox，且方向是竖排（column）：**
```
Web 默认：      React Native 默认：
← 横排 →         ↓ 竖排 ↓
（row）           （column）
```

---

## 路由/导航对比

```
Web React:
URL: https://example.com/about
用 React Router 或 Next.js 管理
历史记录在浏览器里

React Native (Expo Router):
没有 URL 概念（手机没有地址栏）
用"导航栈"模拟 URL 的概念
历史记录在 App 内存里
```

**导航类型对比：**

```
Web:
页面A → 点击链接 → 页面B（浏览器前进/后退）

React Native 有三种导航方式:
1. Stack（栈导航）：像叠卡片
   页面A → push → 页面B → 左滑返回 → 页面A

2. Tab（标签导航）：底部/顶部 Tab 栏
   [Home] [Explore] [Profile]  ← 你项目里有这个！

3. Drawer（抽屉导航）：侧边栏划出菜单
```

---

## Hook 对比（基本通用！）

```
这部分是 React 共有的，Web 和 Native 完全一样：

useState    — 组件状态         ✅ 两者通用
useEffect   — 副作用（请求数据等）✅ 两者通用
useContext  — 读取 Context     ✅ 两者通用
useRef      — 引用 DOM/组件    ✅ 两者通用
useMemo     — 性能优化缓存     ✅ 两者通用
useCallback — 性能优化函数     ✅ 两者通用

特有的（只在 Native 里有意义）：
useColorScheme  — 系统深浅色模式
useWindowDimensions — 屏幕尺寸
```

---

## 事件系统对比

| Web React | React Native | 说明 |
|-----------|-------------|------|
| `onClick` | `onPress` | 点击 |
| `onChange` | `onChangeText` | 输入变化 |
| `onMouseEnter` | 无 | 手机没有鼠标！ |
| `onScroll` | `onScroll` | 滚动 |
| `onSubmit` | 手动处理 | 表单提交 |

---

## 一张图总结：什么是共享的，什么不同

```
┌─────────────────────────────────────────────┐
│           两者完全共用的部分                  │
│                                             │
│  • React 组件思想（函数组件、Props、State）  │
│  • 所有 Hook（useState、useEffect 等）       │
│  • JSX 语法                                  │
│  • Context / 状态管理（Redux、Zustand 等）   │
│  • TypeScript 类型系统                       │
│  • 异步请求（fetch / axios）                 │
│  • 模块系统（import / export）               │
└─────────────────────────────────────────────┘

┌──────────────────┐    ┌──────────────────────┐
│   Web React 独有 │    │  React Native 独有   │
│                  │    │                      │
│ • HTML 标签      │    │ • View/Text/Image 等 │
│ • CSS 全量属性   │    │ • StyleSheet（子集） │
│ • 浏览器 API     │    │ • 原生设备 API       │
│  (localStorage,  │    │  (相机、GPS、震动等) │
│   window, etc.)  │    │                      │
│ • DOM 操作       │    │ • 导航栈概念         │
└──────────────────┘    └──────────────────────┘
```

---

## 学习路径建议

```
如果你已经会 Web React：

掌握 React 核心（Hook、组件、Props、State）
              ↓（这部分直接复用！）
只需要额外学：
  1. View/Text/Image 替代 div/p/img
  2. StyleSheet 的限制（无单位、无伪类）
  3. 导航概念（Stack/Tab/Drawer）
  4. 手机专有 API（相机、传感器等）
              ↓
学习成本大概只需要 Web React 的 30%！
```

----
```
 React Native 独有的，网页 React 没有的：

  ---
  1. 布局用 Flexbox（但默认方向不同）

  网页默认是横排，React Native 默认是竖排：
  // React Native 默认就是 flexDirection: "column"
  // 网页需要手动设置

  ---
  2. 样式没有 CSS，只有 StyleSheet

  // 网页
  <div style="font-size: 16px; background-color: red;">

  // React Native
  `<View style={{ fontSize: 16, backgroundColor: "red"  }}>`

  - 没有 class、没有 CSS 文件
  - 单位不用 px，直接写数字

  ---
  3. 平台判断

  import { Platform } from "react-native";

  Platform.OS === "android"  // 安卓
  Platform.OS === "ios"      // 苹果

  ---
  4. 手机特有的手势

  TouchableOpacity  // 点击
  ScrollView        // 滚动
  FlatList          // 长列表

  ---
  5. 导航（Navigation）

  网页用 URL，手机用页面栈：
  网页：  localhost:3000/articles/1
  手机：  当前页 → 推入新页面 → 返回


  StyleSheet 是 React Native 提供的样式工具。

  ---
  为什么不直接写 style={{ }}？

  你可以直接写：
  <View style={{ backgroundColor: "red", padding: 20 }}>

  但这样每次渲染都重新创建对象，性能差。

  ---
  用 StyleSheet.create() 更好：
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "red",
      padding: 20,
    }
  });

  <View style={styles.container}>

  好处：
  - 样式只创建一次，性能更好
  - 代码更整洁，样式和 JSX 分开
  - 有代码提示和错误检查

  ```


  

  ```
  # React Native 导航与详情页指南

## 第一步：修复首页样式

打开 `app/index.tsx`，把 `container` 样式改成：

```js
container:{
    flex: 1,
    backgroundColor: "#f7adad",
    padding: 20,
    paddingTop: 60,
},
```

---

## 第二步：添加点击跳转

在 `index.tsx` 顶部加一个 import：

```js
import { useRouter } from "expo-router";
```

在 `Index()` 函数里加：

```js
const router = useRouter();
```

把 `TouchableOpacity` 加上 `onPress`：

```jsx
<TouchableOpacity
  style={styles.card}
  onPress={() => router.push(`/article/${item.id}`)}
>

```
```
  onPress 是 React Native 里的点击事件。

  对比：

  ┌────────────┬──────────────┐
  │ 网页 React │ React Native │
  ├────────────┼──────────────┤
  │ onClick    │ onPress      │
  └────────────┴──────────────┘

  // 网页
  <button onClick={() => alert("点击了")}>点我</button>

  // React Native
  <TouchableOpacity onPress={() => alert("点击了")}>
    <Text>点我</Text>
  </TouchableOpacity>

  用户手指按下的时候触发，和网页的 onClick 完全一样，只是名字不同。
  

```

---

## 第三步：创建详情页

在 `app/` 文件夹里新建文件夹 `article`，在里面新建文件 `[id].tsx`。

写入以下内容：

```jsx
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const articles = [
  { id: "1", title: "Hammer really likes me", author: "Nora", content: "She is so cute that she does not know it at all." },
  { id: "2", title: "Nora is really silly", author: "Hammer", content: "She thinks that I don't know I am cute." },
  { id: "3", title: "We care each other", author: "Nora & Hammer", content: "We can live together forever." },
];

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>by {article.author}</Text>
      <Text style={styles.content}>{article.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#888",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
```

---

## 完成后的文件结构

```
app/
├── index.tsx          ← 文章列表页
├── _layout.tsx        ← 路由配置
└── article/
    └── [id].tsx       ← 文章详情页
```

---

## 测试

保存所有文件，模拟器应该自动刷新。
点击文章卡片 → 进入详情页。
点击 ← Back → 返回列表。





# 知识点详解

## 1. useRouter — 页面跳转

`useRouter` 是 Expo Router 提供的钩子，用来控制页面跳转。

```js
const router = useRouter();

router.push("/article/1");   // 跳转到新页面（可以返回）
router.replace("/article/1"); // 跳转到新页面（不能返回）
router.back();               // 返回上一页
```

**对比网页 React：**
| 网页 React | React Native |
|---|---|
| `<Link href="/article/1">` | `router.push("/article/1")` |
| `window.history.back()` | `router.back()` |
| URL 地址栏变化 | 页面栈变化 |

---

## 2. useLocalSearchParams — 获取路由参数

当你跳转到 `/article/1`，详情页需要知道 `id` 是 `1`。

```js
const { id } = useLocalSearchParams();
// id = "1"
```

**对比网页 React：**
| 网页 React (React Router) | React Native (Expo Router) |
|---|---|
| `useParams()` | `useLocalSearchParams()` |
| `const { id } = useParams()` | `const { id } = useLocalSearchParams()` |

---

## 3. 动态路由 [id].tsx

文件名 `[id].tsx` 表示这是一个动态路由。

```
/article/1  →  id = "1"
/article/2  →  id = "2"
/article/3  →  id = "3"
```

**对比：**
| 网页 | React Native |
|---|---|
| `pages/article/[id].tsx` (Next.js) | `app/article/[id].tsx` |
| `routes/article/:id` (Express) | `app/article/[id].tsx` |

---

## 4. 页面栈（Stack Navigation）

手机 app 的页面像一叠卡片：

```
push()  →  把新页面放到最上面
back()  →  把最上面的页面移走
```

```
[列表页] → push → [列表页][详情页]
                ← back ←
```

网页用 URL 导航，手机用页面栈导航。这是最大的区别之一。

---

## 5. articles.find()

```js
const article = articles.find((a) => a.id === id);
```

在数组里找到 id 匹配的那一条数据。

```js
// articles = [{ id: "1", ... }, { id: "2", ... }]
// id = "2"
// 结果：{ id: "2", title: "Nora is really silly", ... }
```

---

## 总结：React vs React Native 核心区别

| | React (网页) | React Native (手机) |
|---|---|---|
| 容器 | `<div>` | `<View>` |
| 文字 | `<p>`, `<h1>` | `<Text>` |
| 列表 | `array.map()` | `<FlatList>` |
| 点击 | `onClick` | `onPress` |
| 样式 | CSS 文件 | StyleSheet |
| 导航 | URL / React Router | Expo Router / 页面栈 |
| 运行平台 | 浏览器 | Android / iOS |




  问题2：为什么 [id].tsx 里重复写 articles 数据？

  因为详情页需要根据 id 找到对应的文章内容，所以需要数据。

  真实项目里会把数据单独放在一个文件里，两个页面都去读它：

  data.js          ← 数据放这里
  index.tsx        ← 从 data.js 读
  [id].tsx         ← 从 data.js 读

  但现在为了简单，先重复写一遍，之后可以重构。
