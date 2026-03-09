import { useState, useEffect}   from "react";
import style from "./Counter.module.css";


export default function Counter(){
    const [value, setValue] = useState(0);

    useEffect(() =>{
        document.title = `Counter value: ${value}`;
    },[]);


    return(
        <div className={style.counter}>
        <button onClick={() => setValue(value - 1)}> Decrement </button>
        <p>Current value:{value}</p>
        <button onClick={()=> setValue(value+ 1)}>Increment</button>
        
        </div>
    )
}