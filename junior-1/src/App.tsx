/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import './App.css'
const App = () => {
  const [circles, setCircles] = useState<any>([])
  const [popped, setPopped] = useState<any>([])

  const handleCirclePlacement = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e

    const newCircle = {
      posX: clientX,
      posY: clientY,
    }

    setCircles(() => [...circles, newCircle])
  }

  const undoCircles = () => {
    if (circles.length === 0) return
    const newCircles = [...circles]
    const poppedPoint = newCircles.pop()
    setPopped([...popped, poppedPoint])
    console.log(popped)
    setCircles(newCircles)
  }

  const redoPlacement = () => {
    if (circles.length < 0) return
    const poppedPoint = popped.pop()
    const newCircles = [...circles]
    if (!poppedPoint) return
    newCircles.push(poppedPoint)
    setCircles(newCircles)
  }

  const clearCircles = () => {
    setCircles([])
  }

  return (
    <div className='App' onClick={handleCirclePlacement}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          redoPlacement()
        }}
      >
        redo
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          undoCircles()
        }}
      >
        undo
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          clearCircles()
        }}
      >
        clear
      </button>
      {circles.map((circle: any, idx: number) => (
        <div
          key={idx}
          className='circle'
          style={{
            position: 'absolute',
            left: circle.posX,
            top: circle.posY,
          }}
        ></div>
      ))}
    </div>
  )
}

export default App
