import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { CookiesProvider, useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import { find, isEmpty, timestamp } from "rxjs";
import { v4 as uuid } from "uuid";
export default   function App() {
  const [answer, setAnswer] = useState(true);
  const [uname, setUname] =  useState("");
  const [open, setOpen] =  useState(false);
  const [db, setDb] =  useState();
  const [name, setName] =  useState("");
  const [items, setItems] = useState([]);
  const [cookies, setCookie] = useCookies(null)
    const [value, setValue] = useState(""); 
    async function handleSubmit(e){
      e.preventDefault(); 
      setCookie("user",e.target.name.value,{ path: '/' })
  }
  async function handleSubmit2(e){
    e.preventDefault();
    setOpen(false)
    var  unique_id = uuid();
    const doc =  {
      id: unique_id.slice(0, 10),
      name: ""+e.target.name.value,
      description: ""+e.target.desc.value,
      done:0,
      timestamp : ""+e.target.date.value,
    };
    items.push(doc)
    }
     async function removeTodo(id){  
    var arr = items.filter(function(item) {
      return item.id !== id
  })
  setItems(arr)
  } 
  async function  stopload(){
    const time =  setTimeout(async() =>{      
       setAnswer(false)
     },1000)
     }
   stopload()
  return (
    <div className="App"> 
    {answer===true?
      <img className='logo' src={require('./img/applogo.png')} />
      :
     cookies.user==null?
      <Form onSubmit={handleSubmit} className="col-md-8 center">
        <h1 className="text-center">Welcome to To Do List App</h1>
        <h3 className="text-center">Please Enter your name</h3>
      <Form.Group className="mb-3 frm" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter your name" />
      </Form.Group>
      <Button className="sbmt" variant="primary" type="submit">
        Submit
      </Button>
    </Form>:<div className="body">    
    <img onClick={()=>{setOpen(!open)}} className='add' src={require('./img/add.png')} />
    
    <div
      className="modal show"
      style={open==true?{display: 'block'}:{display: 'none', position: 'initial' }}
    >
    <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add Task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form className="nopdng" onSubmit={handleSubmit2}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="black">User Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter Task title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="black">Task Desciption</Form.Label>
        <Form.Control className="textarea" as="textarea" name="desc" type="text" placeholder="Enter Task description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control name="date" type="date" placeholder="Enter  date" />
      </Form.Group>
      <Button className="btn btn-primary text-right" variant="primary" type="submit">
        save Changes
      </Button>
      <Button style={{"margin-right":'10px'}} onClick={()=>{setOpen(!open)}} className="btn btn-secondary text-right" variant="secondary">
        close
      </Button>
      </Form>
        </Modal.Body>
      </Modal.Dialog>
      </div>

    <div className="col-lg-8 col-md-12  center">
    <h2 className="text-center">Welcome {cookies.user}</h2>
    <div className="col-lg-12">
      {items.map(function(todo){
return(
      <div className="todo">
      <img className="trash" src={require('./img/trash.png')} onClick={async ()=>{removeTodo(todo.id)}} />
        <h4>{todo.name}</h4>
        <p>{todo.description}</p>
        <p>{todo.timestamp}</p>
        </div>)
      })}
      </div>
</div>
</div>}
      </div>
  );
}

