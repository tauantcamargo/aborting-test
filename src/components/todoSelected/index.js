import { useTodo } from "../../providers/todoProvider"

export default function TodoSelected() {
  const { todoTitle, noTodo, todoStatus } = useTodo()

  if (noTodo) return null

  return (
    <>
      <span>Title: {todoTitle}</span>
      <p>status: {todoStatus}</p>
    </>
  )
}
