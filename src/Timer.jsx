import { useState ,useEffect } from "react";
import styles from "./Timer.module.css";

export default function Timer(){
    const[seconds , setSeconds] = useState(0);
    const[isActive,setActive] = useState(false); 

    useEffect(() =>{
        let interval = null;
        if(isActive){
            interval = setTimeout(()=> setSeconds(seconds + 1) ,1000);
        }
        return () => clearTimeout(interval);
    },[seconds, isActive]);


    return(
        <div className={styles.timer}> 
        <p>{seconds}s</p>
        <button disabled={isActive} onClick={()=> setActive(true)}>start</button>
        <button disabled={!isActive} onClick={()=> setActive(false)}>stop</button>
        </div>
    );
}



