import React, { useEffect, useState } from 'react'
import api from "../api/axios";


const Dashboard = ({user}) => {
  const[todos,setTodos] = useState([]);

  //new todo form
  const[newForm, setNewForm] = useState({title:"",description:""});

  //edit state
  const[editingTodo, setEditingTodo] = useState(null);
  const[editForm, setEditForm] = useState({title:"",description:""});

  //fech todos
  const fetchTodos = async() =>{
    try{
      const res = await api.get("/todo/all");
      setTodos(res.data.todos); 
    }catch(err){
      console.error("Error fetching todo: ",err)
    }
  }

  //crete todo
  const addTodo = async(e) => {
    e.preventDefault();
    if(!newForm.title.trim())return alert("Title is required");
    try{
      const res = await api.post("/todo/create", {
        title:newForm.title,
        description:newForm.description,
      });
      setTodos([res.data.todo, ...todos])
      setNewForm({title:"",description:""});
    }catch(err){
      alert("Error creating todo");
    }
  }

  // toggle 
  const toggleTodo = async(id) =>{
    try{
      const res = await api.patch(`/todo/toggle/${id}`);
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    }catch(error){
      alert("Error toggling todo");
    }
  }

  //Delete todo
  const deleteTodo = async(id) => {
    try{
      const res = await api.delete(`/todo/delete/${id}`); //cleaned the db
      setTodos(todos.filter((t) => t._id !== id));
    }catch(err){
      alert("Error deleting todo");
    }
  }

  //Update todo
  const updateTodo = async(id) => {
    try{
      const res = await api.put(`todo/update/${id}`,{
        title:editForm.title,
        description:editForm.description,
      });
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
      setEditingTodo(null);
      setEditForm({title:"",description:""});
    }catch(err){
      alert("Error updating todo")
    }
  }

  useEffect(() => {
    fetchTodos();
  },[])

  return (
    <div className='max-w-2xl mx-auto mt-10'>
      <h1>
        Welcome, {user?.name || "User"} 👋
      </h1>

      <form
        onSubmit={addTodo}
        className="bg-white shadow-md rounded-xl p-4 mb-6 space-y-3"
      >
        <input type="text"
          placeholder='Title'
          value={newForm.title}
          onChange={(e) => setNewForm({...newForm, title:e.target.value })}
          className='w-full border p-w rounded'
        />

        <textarea
          placeholder='Description'
          value={newForm.description}
          onChange={(e) => {
            setNewForm({...newForm, description:e.target.value})
          }}
          className='w-full border p-2 rounded'
        />
        <button className='bg-green-500 text-white px-4 ppy-2 rounded w-full'>
          Add Todo
        </button>
      </form>

      {/* todo list */}
    </div>
  )
}

export default Dashboard