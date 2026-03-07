export default function ArticleView({article}){
    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>

        </div>
    );
}