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

  const updateTodo = (id, updatedTitle) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, title: updatedTitle} : todo))
  }

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter(todo => todo.id !== todoToDelete.id))
  }
  
  return (
    <>
      <Todoinput newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={handleSubmit}/>
      <Todolist todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
    </>
  )
}

function Todolist({todos, updateTodo, deleteTodo}){
  return (
    <ol>
      {todos.map(todo => <Todoline key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>)}
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

function Todoline({todo, updateTodo, deleteTodo}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTodo, setEditTodo] = useState(todo.title)

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleBlur()
    }
  }
  
  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    updateTodo(todo.id, editTodo)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setEditTodo(e.target.value)
  }

  return (
    <li key={todo.id}>
      {isEditing ? (
        <input 
          type="text"
          value={editTodo}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{todo.title}</span>
      )}
      <button onClick={() => deleteTodo(todo)}>-</button>
    </li>
  )
}