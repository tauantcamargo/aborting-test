import { createContext, useCallback, useContext, useMemo, useState } from "react"

const TodosContext = createContext(null)

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [requestStatus, setRequestStatus] = useState({ status: 'firstTime', counter: 0 })
  const [error, setError] = useState(null)
  const failedRequest = requestStatus.status === "failed"
  const noTodos = Boolean(!todos.length)

  const getTodos = useCallback(async () => {
    const controller= new AbortController()
    const interval = setInterval(() => {
      controller.abort()
    }, 500)
    const counterLimit = requestStatus.counter === 10
    const breakRequest = requestStatus.status === "success" || requestStatus.counter === 11

    if (breakRequest) {
      return 
    }

    try {
      const response = await fetch('http://localhost:3000/todos', { signal: controller.signal })

      if (response.ok) {
        const data = await response.json()
        setRequestStatus({ status: "success", counter: 0 })
        setTodos(data)
      }
    } catch (err) {
      const isAbortError = err && err.name === "AbortError"
      if (counterLimit) {
        setError("We tryed more than 10 times, try later!")
        return
      }
      if (isAbortError) {
        setError("The request was aborted by client side because it's taking a while to finish! We will try again!")
      }
      
      setError("Error on request")
      setRequestStatus(prev => {
        return { status: "failed", counter: Number(prev.counter + 1) }
      })
    } finally {
      setIsLoading(false)
    }
    
    return () => {
      clearInterval(interval)
    }
  }, [requestStatus])

  const value = useMemo(
    () => ({
      todos,
      noTodos,
      isLoading,
      error,
      failedRequest,
      getTodos
    }),
    [todos, noTodos, isLoading, error, failedRequest, getTodos]
  )

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodos = () => {
  const todosContenxt = useContext(TodosContext)

  if (!todosContenxt) {
    throw new Error(
      'useTodos was called without being nested in TodosProvider'
    )
  }

  return todosContenxt
}

export default TodosProvider
