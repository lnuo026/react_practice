# React Native_simpleArticle

### Hammer and Nora

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

---

## 第三步：创建详情页

在 `app/` 文件夹里新建文件夹 `article`，在里面新建文件 `[id].tsx`。

写入以下内容：

```jsx
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const articles = [
  {
    id: "1",
    title: "Hammer really likes me",
    author: "Nora",
    content: "She is so cute that she does not know it at all.",
  },
  {
    id: "2",
    title: "Nora is really silly",
    author: "Hammer",
    content: "She thinks that I don't know I am cute.",
  },
  {
    id: "3",
    title: "We care each other",
    author: "Nora & Hammer",
    content: "We can live together forever.",
  },
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
