import { useState } from 'react'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Finish assignment', completed: true },
    { id: 3, text: 'Reply to email', completed: false },
  ])

  const completedCount = tasks.filter((task) => task.completed).length

  function handleAdd(text) {
    setTasks((currentTasks) => {
      const nextId = currentTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
      return [...currentTasks, { id: nextId, text, completed: false }]
    })
  }

  function handleToggle(id) {
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function handleDelete(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <header className="top-bar">
        <button className="menu-button" type="button">
          <img src={menuIcon} alt="Menu" />
        </button>
        <label className="search-box">
          <img src={searchIcon} alt="" />
          <input type="search" placeholder="Quick find" aria-label="Quick find" />
        </label>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <div className="page-layout">
        <nav className="sidebar" aria-label="Main navigation">
          <ul>
            <li className="current-page">
              <img src={inboxIcon} alt="" />
              <span>Inbox</span>
              <span className="nav-count">{tasks.length}</span>
            </li>
            <li>
              <img src={calendarIcon} alt="" />
              <span>Today</span>
            </li>
            <li>
              <img src={upcomingIcon} alt="" />
              <span>Upcoming</span>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <h1>Inbox</h1>
          <div className="filters">
            <button className="selected-filter" type="button">All</button>
            <span aria-hidden="true">|</span>
            <button type="button">Active</button>
            <span aria-hidden="true">|</span>
            <button type="button">Completed</button>
          </div>
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
          <TaskForm onAdd={handleAdd} />
        </main>
      </div>
    </div>
  )
}

export default App
