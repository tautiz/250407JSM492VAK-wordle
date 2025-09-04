import React from 'react'
import { WordleGame } from '../features/wordle-game'
import '../shared/ui/styles/global.css'

export default function App() {
  return (
    <div className="app">
      <WordleGame />
    </div>
  )
}
