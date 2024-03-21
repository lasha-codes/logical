/* eslint-disable no-constant-condition */
import { useEffect } from 'react'
import './App.css'
import { useRef, useState } from 'react'

const App = () => {
  const inpRef = useRef()
  const [percent, setPercent] = useState(0)
  const [scroll, setScroll] = useState({ mouseX: 0, mouseY: 0 })

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const posY = window.scrollY / 9.6
      setPercent(posY.toFixed(0))
      if (window.scrollY === 943) {
        setPercent(100)
      }
    })

    window.addEventListener('mousemove', (e) => {
      setScroll({ mouseX: e.clientX, mouseY: e.clientY })
    })

    window.addEventListener('mouseout', () => {
      setScroll({ mouseX: 10, mouseY: 10 })
    })
  }, [])

  return (
    <div className='container'>
      <div
        className='cursor'
        style={{
          position: 'fixed',
          left: scroll.mouseX - 10,
          top: scroll.mouseY - 10,
        }}
      ></div>
      <div className='progress-bar'>
        <div className='progress-bar-percent'>{`${percent}%`}</div>
        <div
          className='progress-bar-color'
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
      <div className='bottom-container'>
        <input ref={inpRef} />
        <button
          onClick={() => {
            const NumberRef = Number(inpRef.current.value)

            if (!NumberRef) {
              setPercent(0)
            }

            if (NumberRef < 0) {
              setPercent(0)
            } else if (NumberRef > 100) {
              setPercent(100)
            } else {
              setPercent(NumberRef)
            }
            inpRef.current.value = ''
          }}
        >
          submit
        </button>
      </div>
    </div>
  )
}

export default App
