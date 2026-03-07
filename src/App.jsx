// import AboutMe from "./AboutMe.jsx";
import articles from "./airticle";
import ArticleView from "./ArticleView";
import styles from './App.module.css';  




//  const articles = [];

 function App() {
  return (
      <div className={styles.container}>
  
        
      <h1>Articles</h1>
      <div className={styles.articleContainer}  >
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
