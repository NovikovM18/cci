import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

export default function ToDos() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
    <div>
      {todos.map((todo) => (
        <Link
          to={`/todos/${todo.id}`}
          key={todo.id}
        >
          {todo.id}
        </Link>
      ))}
    </div>
    <Outlet />
  </div>
  )
}
