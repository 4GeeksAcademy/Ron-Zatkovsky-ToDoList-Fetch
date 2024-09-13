import React, { useEffect, useState } from "react";
import ListObject from "./ListObject";

export default function ToDoList(){
    const [input,setInput]=useState('');
    const [data,setData]=useState({});
    const [newFetch,setNewFetch]=useState(false);
    const [newRemove,setNewRemove]=useState(false);

    let user="Ron_Zatkovsky"
    useEffect(()=>{
        const createUser= ()=>{
            fetch(`https://playground.4geeks.com/todo/users/`+user,{
                method:'POST',
                body:JSON.stringify({name:'Ron_Zatkovsky'}),
                headers: {
                "Content-Type": "application/json"
                }
            }).catch((e)=>{console.log("user was created ",e)})
        }
        createUser();
        setNewFetch(!newFetch);
    },[newRemove])

	useEffect(()=>{
        const getData=()=>{
             fetch(`https://playground.4geeks.com/todo/users/`+user).then((response)=>{
                if(response.ok){
                    return response.json();
                }
            }).then((jsonData)=>{
                setData(jsonData);
            }).catch((error)=>{console.log(error)})
        }
        getData();
    },[newFetch])

    const postData=()=>{
         fetch(`https://playground.4geeks.com/todo/todos/`+user,{
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
        fetch(`https://playground.4geeks.com/todo/users/`+user,{
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
            {data===undefined?null:data.todos==undefined?null:
            data.todos.map((array)=>{
                return(
                    <div key={array.id} id={array.id}>
                        <ListObject user={user} label={array.label} id={array.id} setData={setData} newFetch={newFetch} setNewFetch={setNewFetch}/>
                    </div>
                );
            })}
        </div>
    )
}