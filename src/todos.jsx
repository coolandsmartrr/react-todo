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

  const handleClick = () => {
    const newTodoEntry = {title: newTodo, id: nextId}
    setTodos([...todos, newTodoEntry])
    setNewTodo("")
    setNextId(nextId + 1)
  }

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter(todo => todo.id !== todoToDelete.id))
  }
  
  return (
    <>
      <Todoinput newTodo={newTodo} setNewTodo={setNewTodo} handleClick={handleClick}/>
      <ol>
        {todos.map(todo => <Todoline key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)}
      </ol>
    </>
  )
}

function Todoinput({newTodo, setNewTodo, handleClick}) {
  return (
    <>
      <form action=""></form>
      <input 
        type="text"
        value={newTodo}
        onChange={
          e => setNewTodo(e.target.value)
        }
      />
      <button onClick={handleClick}>Submit</button>
    </>
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