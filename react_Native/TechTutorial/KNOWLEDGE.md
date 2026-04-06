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
