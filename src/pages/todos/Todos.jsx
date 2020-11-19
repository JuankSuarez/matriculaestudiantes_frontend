import React, { useState } from 'react'

const Todos = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handlerAddTodo = () => {
    const todosList = [...todos]
    todosList.push(todo)
    setTodos(todosList)
  }

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h1>Demo Form</h1>
      <div>
        <input type="text" placeholder="Add Todo" onChange={(e) => setTodo(e.target.value)} />
        <button type="button" onClick={handlerAddTodo}>
          Add Todo
        </button>
      </div>
      <br />
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h2>Todos List</h2>
        <ul>{todos && todos.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  )
}

export default Todos
