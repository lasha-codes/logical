import { useEffect, useState } from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editIdx, setEditIdx] = useState(null)

  useEffect(() => {
    const handleWindowClick = () => {
      setIsEditing(false)
    }
    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])

  const todoStructure = {
    title: title,
    todo: text,
  }

  const deleteTodo = (deleteIdx) => {
    const filteredTodo = todos.filter((todo, idx) => {
      return deleteIdx !== idx
    })
    setTodos(filteredTodo)
  }

  const editTodo = () => {
    const updatedTodos = todos.map((todo, idx) => {
      if (editIdx === idx) {
        return {
          title: title,
          todo: text,
        }
      }
      return todo
    })
    setTodos(updatedTodos)
    setIsEditing(false)
    setText('')
    setTitle('')
  }

  const EditComponent = (
    <form>
      <input
        type='text'
        value={text}
        placeholder='update todo'
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type='text'
        value={title}
        placeholder='update title'
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='button' onClick={editTodo}>
        confirm
      </button>
    </form>
  )

  return (
    <div className='TODO-container'>
      <div className='TODOS'>
        {todos.map((todo, idx) => {
          return (
            <div key={idx} className='wrapper'>
              <button className='delete-btn' onClick={() => deleteTodo(idx)}>
                X
              </button>
              <button
                className='edit-btn'
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)
                  setEditIdx(idx)
                  setText('')
                  setTitle('')
                }}
              >
                <RiEdit2Fill />
              </button>
              <div className='text-wrapper'>
                <h1>{todo.title}</h1>
                <p>{todo.todo}</p>
              </div>
            </div>
          )
        })}
      </div>
      {isEditing ? null : (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            placeholder='Title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            placeholder='Todo'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type='button'
            onClick={() => {
              if (text.trim() === '' || title.trim() === '')
                return alert('must enter a value')
              setTodos([...todos, todoStructure])
              setText('')
              setTitle('')
              console.log(todos)
            }}
          >
            Add
          </button>
        </form>
      )}
      {isEditing ? (
        <div className='edit-div' onClick={(e) => e.stopPropagation()}>
          {EditComponent}
        </div>
      ) : null}
    </div>
  )
}

export default App
