import { Routes ,Route ,useNavigate , useParams ,Navigate} from "react-router-dom";
import { useState } from "react"; 
import initialArticles from "./data";
import Articleview from "./ArticlesView";
import  NewArticleForm from "./NewArticleForm";
import PageWithNavbar from "./PageWithNavbar";



export default function App(){
  const  [articles , setArticles] = useState(initialArticles);

  const navigate = useNavigate();

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

    navigate(`/aritcles/${newArticle.id}`, { replace: true});
  }

return (
  <Routes>
      <Route path="/" element = {<PageWithNavbar />}>
      <Route  index element={<Navigate to ="articles" replace />} />
      
      <Route path="articles" element={< Arti/>}/>
      <Route index element={<Navigate to={`${articles[0].id}`} replace/>}/>
    </Route>
  </Routes>
);
    

}
