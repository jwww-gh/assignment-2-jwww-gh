import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        aria-label="New task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  )
}

export default TaskForm
