import {useLocation} from "react-router-dom";


export function PageNotFound(){
    const { pathname } = useLocation();

    return (
        <p>
            Sorry ,wu couldn't find what your're looking for! Is the path <code>{pathname}</code>
        </p>
    );

}

export function ArticleNotFound(){
    return <p> Sorry we couldn't  find the article you're looking for</p>
}
