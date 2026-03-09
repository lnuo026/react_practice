import { useState ,useRef} from  "react";

export default function FormWithUseState(){
    const count = useRef(0);
    count.current += 1;
    console.log("useState表单渲染了一次 "+ count.current);

    const [name , setName] = useState("");
    const handleClick = () => alert(`My name is ${name}`);
    
    return (
        <>
        <form >
            <label htmlFor="textForm1">Name:</label>
            <input id="textForm1" type="text" value={name } onChange ={(e) =>setName(e.target.value)} />
            </form>

            <button onClick={handleClick}> what's my name</button>
        </>
    );


}

