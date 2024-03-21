import { useRef, useState } from 'react'
import './App.css'

const App = () => {
  const [countdown, setCountdown] = useState(10)
  const [canClick, setCanClick] = useState(false)
  const [message, setMessage] = useState(null)
  const intervalRef = useRef(countdown)
  const countRef = useRef(0)

  const startCountdown = () => {
    setCanClick(true)
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        intervalRef.current = prevCount - 1
        return prevCount - 1
      })
      if (intervalRef.current === 1) {
        clearInterval(countdownInterval)
        setCanClick(false)
        setMessage(
          `Congratulations u have clicked button ${countRef.current} times in 10 seconds`
        )
      }
    }, 1000)
  }

  const handleIncrement = () => {
    if (canClick) {
      countRef.current = countRef.current + 1
      console.log(countRef.current)
    }
  }

  return (
    <div className='countdown-container'>
      <h1>No of Clicks until timer expires</h1>
      <div className='countdown'>
        <p>{message}</p>
        <button onClick={startCountdown}>start</button>
        <h1>{countRef.current}</h1>
        <p>
          {intervalRef.current === 0
            ? 'Time ended refresh to restart'
            : `Time Left: ${intervalRef.current} seconds`}
        </p>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  )
}

export default App
