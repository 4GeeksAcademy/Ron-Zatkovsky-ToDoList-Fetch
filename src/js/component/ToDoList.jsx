import React, { useEffect, useState } from "react";
import ListObject from "./ListObject";

export default function ToDoList(){
    const [input,setInput]=useState('');
    const [data,setData]=useState({});
    const [newFetch,setNewFetch]=useState(false);
    const [newRemove,setNewRemove]=useState(false);
    

    useEffect(()=>{
        const createUser= ()=>{
            fetch(`https://playground.4geeks.com/todo/users/Ron_Zatkovsky`,{
                method:'POST',
                body:JSON.stringify({name:'Ron_Zatkovsky'}),
                headers: {
                "Content-Type": "application/json"
                }
            }).catch((e)=>{console.log("user was created ",e)})
        }
        createUser();
    },[newRemove])

	useEffect(()=>{
        const getData=()=>{
             fetch(`https://playground.4geeks.com/todo/users/Ron_Zatkovsky`).then((response)=>{
                if(response.ok){
                    return response.json();
                }
            }).then((jsonData)=>{
                console.log(jsonData)
                setData(jsonData);
            }).catch((error)=>{console.log(error)})
        }
        getData();
    },[newFetch])

    useEffect(()=>{
        console.log(data);
    },[data])

    const postData=()=>{
         fetch(`https://playground.4geeks.com/todo/todos/Ron_Zatkovsky`,{
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

    const removeUser= ()=>{
        fetch(`https://playground.4geeks.com/todo/users/Ron_Zatkovsky`,{
            method:"DELETE",
        });
        setNewRemove(!newRemove);
        setNewFetch(!newFetch);
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
                    className="col"
                ></input>
                <button className="btn btn-primary col" onClick={removeUser}>
                    Delete all tasks
                </button>
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