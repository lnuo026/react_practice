import { useState } from "react";


export default function AddArticleComponent({ onAddArticle }) {
    const [ title, setTitle] = useState("");
    const [content, setContent] = useState("");


    return(
        <div className="add-article">
            <h2>Add Article</h2>
            <div className="form">
                <div className="form-row">
                    <label >Title</label>
                    <input type="text"  value={title} onInput={(e) =>setTitle(e.target.value)}/>
                </div>
                <div className="form-row">
                    <label>Content</label>
                    <textarea rows={5} value={content} onInput={(e) => setContent(e.target.value)} />
                </div>

                <div className="form-row" style={{ flexDirection: "row-reverse" }}>
                    <button
                    className="right-align"
                    style={{flexBasis :" 100px" ,flexGrow: 0}}
                    onClick={() => {
                        onAddArticle("默认title", "默认content");
                        console.log(title,content)
                    }}
                    >
                        Add articels
                    </button>


                </div>
            </div>

        </div>

    );
}