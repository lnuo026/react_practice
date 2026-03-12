import { Link , NavLink} from "react-router-dom";
import styles from "./ArticleSidebar.module.css";

export default function ArticleSidebar ( {articles}){
    return (
        <div className={styles.navBar}>
            <h1>Articles</h1>
            {articles.map((article) =>(
                <NavLink
                    key={article.id}
                    to={`${article.id}`}
                    className={({isActive}) =>(isActive ? styles. actice : undefined)}
                >
                    {article.title}
                    </NavLink>
            ))}

            <hr />
            
            <Link to="newArticle" className={styles.addNew}> 
new article
            </Link>

        </div>
    );





}