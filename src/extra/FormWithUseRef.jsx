import {useRef } from "react";

export default function FormWithUseRef(){

    const count = useRef(0)
    count.current +=1;
    const inputRef = useRef(null);
    console.log("渲染testing"+ count.current);

    const handleClick = () =>alert(`My name is ${inputRef.current.value}`);

    return(
        <>
        <form>
            <label htmlFor="textForm2"> Name: ?? </label>
            <input ref={inputRef} id="textForm2" type="text" />
        </form>
            <button onClick={handleClick}>What's my name ? </button>
        </>
    );
}