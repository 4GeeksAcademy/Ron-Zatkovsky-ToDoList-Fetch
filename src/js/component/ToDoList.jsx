import React, { useEffect, useState } from "react";
import ListObject from "./ListObject";

export default function ToDoList(){
    const [input,setInput]=useState('');
    const [data,setData]=useState({});
    const [newFetch,setNewFetch]=useState(false);

	useEffect(()=>{
        async function getData(){
            await fetch(`https://playground.4geeks.com/todo/users/`+'Ron_Zatkovsky').then((response)=>{
                if(response.ok){
                    return response.json();
                }
            }).then((jsonData)=>{
                setData(jsonData);
            }).catch((error)=>{console.log(error)})
        }
        getData();
    },[newFetch])

    useEffect(()=>{
        console.log(data.todos);
    },[data])

    async function postData(){
        await fetch(`https://playground.4geeks.com/todo/todos/`+'Ron_Zatkovsky',{
            method:'POST',
            body:JSON.stringify({label:input,is_done:false}),
            headers: {
                "Content-Type": "application/json"
                }
        }).then((response)=>{
            if(response.ok) {
                console.log("List updated")
                setNewFetch(!newFetch)}
        else{
                console.log(response.statusText);
        }
        }).catch((error)=>{console.log(error)});
    }


    const handleEnter=(key)=>{
        if(key==="Enter"){
            postData();
            setInput("");
        }
    }
    return(
        <div>
            <div>
                <input 
                    placeholder="What needs to be done?"
                    onChange={(e)=>{setInput(e.target.value)}}
                    value={input}
                    onKeyUp={(e)=>{handleEnter(e.key)}}
                ></input>
            </div>
            {data.todos==undefined?null:
            data.todos.map((array)=>{
                return(
                    <div key={array.id} id={array.id}>
                        <ListObject label={array.label} id={array.id} setData={setData} newFetch={newFetch} setNewFetch={setNewFetch}/>
                    </div>
                );
            })}
        </div>
    )
}