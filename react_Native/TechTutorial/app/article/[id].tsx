import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const articles = [
  { id: "1", title: "Hammer really likes me", author: "Nora", content: "🐶She is so cute that she does not know it at all." },
  { id: "2", title: "Nora is really silly", author: "Hammer", content: "She thinks 😼that I don't know I am cute." },
  { id: "3", title: "We care each other", author: "Nora & Hammer", content: "We can live together forever😍." },
];


export default function ArticleDetail(){
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const article = articles.find((a) =>a.id === id);

    if(!article){
        return(
        <View style={styles.container}>
        <Text>Article not found.</Text>
        </View>
        );
    }


    /**
     *  
        整体就是：
        ┌─────────────────┐
        │ ← Back          │
        │                 │
        │ 文章标题         │
        │ by 作者          │
        │                 │
        │ 文章内容...      │
        └─────────────────┘
     */ 
    return (
        <View style={styles.container}>
            
            {/* 一个可点击的"返回按钮"，点击后 router.back() 返回上一页 */}
            <TouchableOpacity onPress={() => router.back()} 
                style={styles.backButton}>
                    <Text style={styles.backText}> 👈Back</Text>
            </TouchableOpacity>

            {/*  显示文章标题，article 是从数组里找到的那条数据 */}
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.author}>{article.author}</Text>
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