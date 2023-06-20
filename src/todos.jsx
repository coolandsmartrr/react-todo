import { useState } from 'react';

export default function Todos(){
  const defaultTodos = [
    {title: "Make bed", id: 1},
    {title: "Cook dinner", id: 2},
    {title: "Vaccum floor", id: 3}
  ]
  
  const [todos, setTodos] = useState(defaultTodos)  
  const [newTodo, setNewTodo] = useState("")

  const handleClick = () => {
    const newTodoEntry = {title: newTodo, id: todos.length + 1}
    setTodos([...todos, newTodoEntry])
    setNewTodo("")
  }

  return (
    <>
      <input 
        type="text"
        value={newTodo}
        onChange={
          e => setNewTodo(e.target.value)
        }
      />
      <button onClick={handleClick}>Submit</button>
      <ol>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ol>
    </>
  )
}

