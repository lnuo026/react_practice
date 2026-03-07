import { useState} from "react";
import initalArticles from "./initial-article.js";
import ArticleView from "./ArticleView";  
import AddArticleComponent from "./AddArticleComponent";



 function App() {

  const [articles, setArticles]  = useState(initalArticles);

  return (
      <div className="container">
      <h1>Articles</h1>
      <div className="articleContainer ">
      {articles && articles.length > 0 ? (
        articles.map((article) => <ArticleView key={article.id} article={article} />)
      ):(
          <p>There are no article :(</p>
      )}

      <AddArticleComponent 
      onAddArticle={(title , content) =>{
        setArticles([
          {id: articles.length + 1,
            title,
            content
          },
          ...articles
        ])
      }
    }  
   />


      </div>
    </div>
  );
}

export default App
