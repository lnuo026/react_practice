// import articles from "./airticle";
import AboutMe from "./AboutMe.jsx";
import ArticleView from "./ArticleView";



 const articles = [];

 function App() {
  return (
      <div>
        <AboutMe name="Hammer" like="beef"/>
        
      <h1>hi</h1>
      {articles && articles.length > 0 ? (
        articles.map((article) => <ArticleView key={article.id} article={article} />)
      ):(
          <p>There are no article :(</p>
      )}
      </div>
  );
}

export default App
