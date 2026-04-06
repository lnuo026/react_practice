
/**
 *  FlatList = 列表组件
 * 
 * <FlatList
    data={articles}        // 数据从哪里来
    keyExtractor={...}     // 每条数据的唯一id
    renderItem={...}       // 每条数据长什么样
  />
 
 */  
import {Text,  View , StyleSheet, FlatList, TouchableOpacity}  from "react-native";
// `useRouter` 是 Expo Router 提供的钩子，用来控制页面跳转。 
import { useRouter} from "expo-router";

  const articles = [
    { id: "1", title: "Hammer really likes me", author:
  "Nora", content: "She is so cute that she does not know it at all." },
    { id: "2", title: "Nora is really silly", author:
  "Hammer", content: "She thinks that I don't know I am cute." },
    { id: "3", title: "We care each other", author: "Nora & Hammer", content: "We can live together forever." },
  ];

  
  export default function Index(){
    const router = useRouter();
    return(
          <View style={styles.container}>
            <Text style={styles.title}>Nora & Hammer's Articles</Text>
            <Text style={styles.subtitle}>Welcome to our app!</Text>

            <FlatList 
            data ={articles}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>(
              <TouchableOpacity   
              style={styles.card} 
              onPress  = { ()=> router.push(`/article/${item.id}`)}
              >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}> by {item.author}</Text>
              </TouchableOpacity>
            )}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:  1,
        backgroundColor: "#f7adad",
        padding: 20,
        paddingTop: 60,
    },
    title:{
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: "gray",
    },
    card: {
    backgroundColor: "#abe0c2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
   cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardAuthor: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  }
});
