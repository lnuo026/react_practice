import articles from "./airticle";
// import AboutMe from "./AboutMe.jsx";
import ArticleView from "./ArticleView";



//  const articles = [];

 function App() {
  return (
      <div className="container">
  
        
      <h1>Articles</h1>
      <div className="articleContainer">
      {articles && articles.length > 0 ? (
        articles.map((article) => <ArticleView key={article.id} article={article} />)
      ):(
          <p>There are no article :(</p>
      )}
      </div>
      </div>
  );
}

export default App
