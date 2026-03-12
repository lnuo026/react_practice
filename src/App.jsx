import { Routes ,Route ,useNavigate , useParams ,Navigate} from "react-router-dom";
import { useState } from "react"; 
import initialArticles from "./data";
import ArticleView from "./ArticlesView";
import  NewArticleForm from "./NewArticleForm";
import PageWithNavbar from "./PageWithNavbar";
import ArticlesPage from "./ArticlesPage";
import {  ArticleNotFound, PageNotFound} from "./ErrorPages";
import GalleryPage from "./GalleryPage";



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

    navigate(`/articles/${newArticle.id}`, { replace: true});
  }

return (
  <Routes>
      <Route path="/" element = {<PageWithNavbar />}>
      <Route  index element={<Navigate to ="articles" replace />} />
      
      <Route path="articles" element={< ArticlesPage articles={articles}/>}>
      <Route index element={<Navigate to={`${articles[0].id}`} replace/>}/>
      <Route path=":id" element={<AritcleViewFromPathParams articles={articles} />}/>
      <Route path="newArticle" element={<NewArticleForm onAddArticle={handleAddArticles}/>}/>
    </Route>

    <Route path="gallery" element={<GalleryPage articles={articles} />}/>
    <Route path="*" element={<PageNotFound />}/>


    </Route>
  </Routes>
);
}

function AritcleViewFromPathParams ( {articles}){
  const {id} = useParams();
  const article = articles.find( (a) => a.id == id);

  if(article){
    return<ArticleView article={article} />;
  }else{
    return<ArticleNotFound />;
  }

}
