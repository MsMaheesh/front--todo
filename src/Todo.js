import React,{useEffect, useState} from 'react'
import   './App.css'
import axios from 'axios'

axios.defaults.baseURL="https://todo-fullstack-backend-1.onrender.com"
//https://todo-fullstack-backend-1.onrender.com http://localhost:5000
function Todo() {
    const [status,setStatus]=useState(true)
    const[datalist,setDatalist]=useState([])
    const  [todoId,settodoId]=useState()
    const [message,setMessage]= useState({
        todo:"",   
    })

    const messageHandle=(e)=>{
        setMessage({
            ...message,
            todo:e.target.value
    });
    };
    

    const btn=async(e)=>{
        e.preventDefault();
        const data=await axios.post('/addtodo',message)
        // console.log(data)
        // console.log(data.status)
        if(data.status===200){
            getdata()
            alert("todo added")
            setMessage({todo:""})
        }
    }    
const getdata =async ()=>{
    const data = await axios.get("/getdata")
    setDatalist(data.data)
   // console.log(datalist)
}
useEffect(()=>{
    getdata();
 },[])

const delet =async(id)=>{
    await axios.delete('/'+id)
    getdata()
    alert("deleted successfully")     
} 

const edit = async(id,mess)=>{
    setStatus(false)
    console.log(id,mess)
    setMessage({todo:mess})
    settodoId(id)
    //console.log(message.todo,"j");
    
}
const editbtn = async(id,mess)=>{
    console.log(id,mess.todo)
    //setMessage({todo:mess})
    await axios.put('/'+id,mess)
    getdata()
    alert("data updated successfully")
    setStatus(true)
}
  return (
    <div className='box'>
        <h2>TODO'S</h2>
    <div className='container'>
        <form className='form'>
            
            <input className='input'  
            placeholder='enter the message' 
            value={message.todo} 
            onChange={messageHandle}
            />
            <div className='button'>
            {status ?<button className='btn' onClick={btn} type="submit" >Add</button> :<button className='btn' onClick={()=>editbtn(todoId,message)} type="submit" >Edit</button>}
            </div>
        </form>
        <div className='todo_container'>
        {datalist.length===0 && <h2>no Todo</h2>}
            {   
                datalist.map((eachobj)=>{
                    const {todo,_id}=eachobj;
                    return (
                        <div className='todo_items' key={_id}>
                            <span >
                                {todo}
                            </span>
                            <div className='todo_btn'>
                            <button className="btn" onClick={()=>delet(_id)}>del</button>
                            <button className="btn" onClick={()=>edit(_id,todo)}>edit</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
    </div>
  )
}
export default Todo