import styles from "./ArticleView.module.css";

export default function  AritcleView({article}){
    return(
        <>
        <div className={styles.article}>
        <h2>{article.title}</h2>
        <img src={article.image}/>
        <p>{article.content}</p>
        </div>        
        </>
        );

}