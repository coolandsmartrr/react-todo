import { useState } from 'react';

export default function Todos(){
  const defaultTodos = [
    {title: "Make bed", id: 1},
    {title: "Cook dinner", id: 2},
    {title: "Vaccum floor", id: 3}
  ]
  
  const [todos, setTodos] = useState(defaultTodos)  
  const [newTodo, setNewTodo] = useState("")
  const [nextId, setNextId] = useState(4)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const newTodoEntry = {title: newTodo, id: nextId}
      setTodos([...todos, newTodoEntry])
      setNewTodo("")
      setNextId(nextId + 1)
    }
  }

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter(todo => todo.id !== todoToDelete.id))
  }
  
  return (
    <>
      <Todoinput newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit}/>
      <Todolist todos={todos} deleteTodo={deleteTodo}/>
    </>
  )
}

function Todolist({todos, deleteTodo}){
  return (
    <ol>
      {todos.map(todo => <Todoline key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)}
    </ol>
  )
}

function Todoinput({newTodo, setNewTodo, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={newTodo}
        onChange={
          e => setNewTodo(e.target.value)
        }
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

function Todoline({todo, deleteTodo}) {
  return (
    <li key={todo.id}>
      {todo.title}
      <button onClick={() => deleteTodo(todo)}>-</button>
    </li>
  )
}