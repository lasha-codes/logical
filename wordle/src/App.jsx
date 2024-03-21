/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import wordle, { keyboard } from './wordle.js'

const App = () => {
  const [columnIndex, setColumnIndex] = useState(0)
  const [rowsIndex, setRowsIndex] = useState(0)
  const [guessedWord, setGuessedWord] = useState([])
  const [cashAmount, setCashAmount] = useState(0)

  const [wordleTabs, setWordleTabs] = useState([
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
  ])

  const wordForWin = useMemo(() => {
    return wordle[Math.round(Math.random() * wordle.length)].toLowerCase()
  }, [wordleTabs])

  const checkWinningCondition = () => {
    const guessed = guessedWord.join('').toLowerCase()
    if (guessed === wordForWin) {
      setCashAmount(cashAmount + 100)
      alert('You have won the game')
      setColumnIndex(0)
      setRowsIndex(0)
      setGuessedWord([])
      setWordleTabs([
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ])
    }
  }

  const resetGame = () => {
    if (rowsIndex === 0 && columnIndex === 0)
      return alert('you must start the game to restart')
    alert('game has ended')
    setColumnIndex(0)
    setRowsIndex(0)
    setGuessedWord([])
    setWordleTabs([
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ])
  }

  let newTabs = [...wordleTabs]
  const errorMsg = 'warning: letter must be a valid value'

  const HandlePress = (e) => {
    setGuessedWord((prev) => [...prev, e.key])
    const compareWord = wordForWin.split('')[columnIndex]
    if (rowsIndex === 5 && columnIndex === 0) {
      setWordleTabs([
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ])
      setColumnIndex(0)
      setRowsIndex(0)
      return alert('game has ended')
    }

    if (e.key === ' ' || Number(e.key)) return alert(errorMsg)
    setColumnIndex(columnIndex + 1)
    newTabs[columnIndex][rowsIndex] = {
      key: typeof e.key === 'string' ? e.key.toLowerCase() : e.key,
      bgColor: 'none',
      rotate: 45,
      transition: 'all 1s ease',
    }
    const key = newTabs[columnIndex][rowsIndex].key
    if (compareWord.toLowerCase() === key) {
      newTabs[columnIndex][rowsIndex].bgColor = '#80ed99'
    } else if (wordForWin.includes(key)) {
      newTabs[columnIndex][rowsIndex].bgColor = '#ffba08'
    } else {
      newTabs[columnIndex][rowsIndex].bgColor = '#ef233c'
    }
    if (columnIndex === 4) {
      setColumnIndex(0)
      setRowsIndex(rowsIndex + 1)
    }
  }

  if (
    guessedWord.join('').toString().toLowerCase() !==
    wordForWin.toString().toLowerCase()
  ) {
    if (guessedWord.length === 5) {
      setGuessedWord([])
    }
  }

  const HandleKeyPress = (key) => {
    setGuessedWord((prev) => [...prev, key])
    const compareWord = wordForWin.split('')[columnIndex]
    if (rowsIndex === 5 && columnIndex === 0) {
      setWordleTabs([
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ])
      setColumnIndex(0)
      setRowsIndex(0)
      return alert('game has ended')
    }
    if (key === ' ' || Number(key)) return alert(errorMsg)
    setColumnIndex(columnIndex + 1)
    newTabs[columnIndex][rowsIndex] = {
      key: typeof key === 'string' ? key.toLowerCase() : key,
      bgColor: 'none',
      rotate: 45,
      transition: 'all 1s ease',
    }
    const keyPress = newTabs[columnIndex][rowsIndex].key
    if (compareWord.toLowerCase() === keyPress) {
      newTabs[columnIndex][rowsIndex].bgColor = '#80ed99'
    } else if (wordForWin.includes(key)) {
      newTabs[columnIndex][rowsIndex].bgColor = '#ffba08'
    } else {
      newTabs[columnIndex][rowsIndex].bgColor = '#ef233c'
    }
    if (columnIndex === 4) {
      setColumnIndex(0)
      setRowsIndex(rowsIndex + 1)
    }
  }
  if (
    guessedWord.join('').toString().toLowerCase() !==
    wordForWin.toString().toLowerCase()
  ) {
    if (guessedWord.length === 5) {
      setGuessedWord([])
    }
  }

  useEffect(() => {
    console.log(wordForWin)

    checkWinningCondition()

    window.addEventListener('keypress', HandlePress)

    return () => {
      window.removeEventListener('keypress', HandlePress)
    }
  }, [wordleTabs, columnIndex, rowsIndex, guessedWord, wordForWin])

  return (
    <div className='App'>
      <div className='cash'>{`U have won $${cashAmount}`}</div>
      <div className='wordle-container'>
        {wordleTabs.map((row, idx) => {
          return (
            <div key={idx} className='rows'>
              {row.map((column, idx) => {
                return (
                  <motion.div
                    initial={{
                      rotate: 45,
                    }}
                    animate={{
                      rotate: 0,
                    }}
                    className='columns'
                    key={idx}
                    style={{
                      backgroundColor: column.bgColor,
                    }}
                  >
                    <motion.div
                      initial={{ rotate: column.rotate }}
                      animate={{ rotate: 0 }}
                      transition={{
                        duration: 1,
                      }}
                    >
                      {column.key}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          )
        })}
      </div>
      <button className='reset-btn' onClick={resetGame}>
        restart
      </button>
      <div className='keyboard'>
        {keyboard.map((key, idx) => {
          return (
            <div
              key={idx}
              className='key-cap'
              onClick={() => HandleKeyPress(key)}
            >
              {key}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
