import { BrowserRouter ,Route ,Routes ,useParams} from "react-router-dom";
import { useState } from "react";
import AritcleView from "./ArticlesView";
import ArticleNavBar from "./ArticleNavBar";
import initialArticles from "./initial-article";


function App(){
  const [articles, setArticles] = useState(initialArticles);
  
  return (
 <BrowserRouter>
  <div className="container">
    <div className="sidebar">
      <h1>Articles</h1>
        <ArticleNavBar articles={articles}/>
    </div>

    <main>
      <div className="box">
        <Routes>
          <Route path="/articles/:id" element={<ArticleViewFromRouter articles={articles}/>} />
          <Route path="*" element={<h2>Please select an article to the left</h2>}/>
          </Routes>
        </div>
      </main>
    </div>
  </BrowserRouter>
  );
}

    function ArticleViewFromRouter({articles}){
            const {id} = useParams();


            return <AritcleView article={articles.find((a) =>a.id == id)}/>

}
export default App;