import { useEffect, useState } from 'react'
import { pickRandom, isValidWord } from '../../../shared/lib/words'
import { evaluate } from '../../../shared/lib/evaluate'

export function useWordleGame() {
  const [answer, setAnswer] = useState('')
  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState('')
  const [message, setMessage] = useState('')
  const [won, setWon] = useState(false)

  useEffect(() => {
    setAnswer(pickRandom())
  }, [])

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(''), 3000)
      return () => clearTimeout(t)
    }
  }, [message])

  function onKey(key) {
    if (won || guesses.length >= 6) return
    if (key === 'Enter') {
      if (current.length !== 5) {
        setMessage('Neužpildytas žodis — įveskite 5 raides prieš patvirtinimą.')
        return
      }
      if (!isValidWord(current)) {
        setMessage('Žodis neegzistuoja esamam žodyne — patikrinkite rašybą arba pasirinkite kitą žodį.')
        return
      }
      const next = [...guesses, current]
      setGuesses(next)
      setCurrent('')
      if (current === answer) {
        setWon(true)
        setMessage('Sveikiname! Žodį atspėjote!')
      } else if (next.length >= 6) {
        setMessage(`Pralaimėjai — teisingas žodis: ${answer}`)
      }
      return
    }
    if (key === 'Backspace') {
      setCurrent(s => s.slice(0, -1))
      return
    }
    if (current.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setCurrent(s => (s + key.toLowerCase()).slice(0, 5))
    }
  }

  useEffect(() => {
    function handler(e) {
      if (e.key === 'Enter') onKey('Enter')
      else if (e.key === 'Backspace') onKey('Backspace')
      else if (e.key.length === 1) onKey(e.key)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, guesses, answer, won])

  // compute keyboard colors
  const statusMap = {}
  for (const g of guesses) {
    const ev = evaluate(g, answer)
    for (let i = 0; i < 5; i++) {
      const ch = g[i]
      const st = ev[i]
      const prev = statusMap[ch]
      if (prev === 'correct') continue
      if (prev === 'present' && st === 'absent') continue
      statusMap[ch] = st
    }
  }

  function submitGuess() {
    onKey('Enter')
  }

  function resetGame() {
    setAnswer(pickRandom())
    setGuesses([])
    setCurrent('')
    setWon(false)
    setMessage('Naujas žaidimas pradėtas')
  }

  function showHelp() {
    setMessage('Žaidimas: 5 raidžių žodžiai, 6 bandymai. Enter=siųsti, Backspace=trinti.')
  }

  const canSubmit = current.length === 5 && !won && guesses.length < 6

  return {
    answer,
    guesses,
    current,
    message,
    won,
    statusMap,
    onKey,
    resetGame,
    showHelp,
    canSubmit,
    submitGuess
  }
}
