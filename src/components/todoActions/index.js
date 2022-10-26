import { useCallback, useEffect, useRef } from "react"
import { useTodo } from "../../providers/todoProvider"
import { useTodos } from "../../providers/todosProvider"

export default function TodoActions() {
  const { todos, getTodos, failedRequest, noTodos, isLoading, error } = useTodos()
  const { getTodo } = useTodo()
  const controller = useRef(null)
  
  controller.current = new AbortController()

  const requestTodoDetails = useCallback(id => () => {
    controller.current.abort()
    controller.current = new AbortController()
    const signal = controller.current.signal
    getTodo(id, signal)
  }, [controller, getTodo])

  const fetchData = useCallback(async () => {
    try {
      await getTodos()
    } catch (error) {
      console.warn(`${error}`)
    }
  }, [getTodos])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return <h1>Requesting Todos!!!</h1>
  }

  if (failedRequest) {
    return <h1>{error}!</h1>
  }

  if (noTodos) {
    return <h1>No Todos!!!</h1>
  }

  return (
    <ul className="todos__list">
      {todos.map(todo => 
        <button 
          key={todo.id}
          type="button" 
          onClick={requestTodoDetails(todo.id)}
          className="todos__list__item"
        >
          {todo.title}
        </button>
      )}
    </ul>
  )
}
