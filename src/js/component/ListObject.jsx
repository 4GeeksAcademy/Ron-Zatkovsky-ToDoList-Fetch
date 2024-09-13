import React, { useState } from "react";

export default function ListObject(props){
    const [removeable,setRemoveable]=useState(false);
    const [xHover,setXHover]=useState(false);

    const removeItem=async ()=>{
        await fetch(`https://playground.4geeks.com/todo/todos/`+parseInt(props.id),{
            method:"DELETE",
        });
        props.setNewFetch(!props.newFetch);
    }


    return(
        <div className="d-flex border" onMouseOver={()=>{setRemoveable(true)}} onMouseLeave={()=>{setRemoveable(false)}}>
            <div className="col p-2">
                {props.label}
            </div>
            <a className="btn p-2 link-hover" onMouseOver={()=>{setXHover(true)}} style={{opacity:xHover?0.2:1, display:removeable?'block':'none'}} onMouseLeave={()=>{setXHover(false)}} onClick={()=>{removeItem()}}>
                X
            </a>
        </div>
    )
}