
export default function ArticleView({article}){
    return (
        <div className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>

        </div>
    );
}