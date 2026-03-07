
import styles from './ArticleView.module.css';    
export default function ArticleView({article}){
    return (
        <div className={styles.article}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>

        </div>
    );
}