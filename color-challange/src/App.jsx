import { useState, useRef } from 'react'
import './App.css'

const App = () => {
  const [colorVal, setColorVal] = useState()
  const inputRef = useRef()
  return (
    <div className='container'>
      <div className='color-box' style={{ background: colorVal }}></div>
      <div className='inp-container'>
        <button onClick={() => setColorVal(inputRef.current.value)}>
          submitColor
        </button>
        <input ref={inputRef} />
      </div>
    </div>
  )
}

export default App
