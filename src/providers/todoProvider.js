import { createContext, useContext, useMemo, useState } from "react"

const TodoContext = createContext(null)

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState(null)
  const noTodo = Boolean(!todo)
  const todoStatus = todo && Boolean(todo.completed) ? 'completed' : 'need to do'
  const todoTitle = todo && todo.title

  const getTodo = async (id, signal) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, { signal })
      if (response.ok) {
        const data = await response.json()
        setTodo(data)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const value = useMemo(
    () => ({
      todoTitle,
      noTodo,
      todoStatus,
      getTodo
    }),
    [noTodo, todoStatus, todoTitle]
  )

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const todoContenxt = useContext(TodoContext)

  if (!todoContenxt) {
    throw new Error(
      'useTodo was called without being nested in TodoProvider'
    )
  }

  return todoContenxt
}

export default TodoProvider
