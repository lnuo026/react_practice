import { Routes ,Route ,useNavigate , useParams ,Navigate} from "react-router-dom";
import { useState } from "react"; 
import initialArticles from "./data";


export default function App(){
  const  [articles , setArticles] = useState(initialArticles);

  const Navigate = useNavigate();

  function handleAddArticles(title,content){
    const updateArticles = [...articles];
    const newArticle = {
      id: articles.length+1,
      title,
      content,
      image:"https://picsum.photos/400"
    };
    updateArticles.push(newArticle);
    setArticles(updateArticles);

    Navigate(`/aritcles/${newArticle.id}`, { replace: true});


  }
    

}
