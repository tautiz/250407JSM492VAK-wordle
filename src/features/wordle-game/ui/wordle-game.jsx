import React from 'react'
import { useWordleGame } from '../hooks/use-wordle-game'
import { GameGrid } from './game-grid'
import { GameKeyboard } from './game-keyboard'
import { GameMessage } from './game-message'
import { GameControls } from './game-controls'

export function WordleGame() {
  const {
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
  } = useWordleGame()

  return (
    <>
      <div className="header">
        <h1>THE VIRAL GAME<br />ON YOUR PHONE!</h1>
      </div>

      <GameGrid 
        guesses={guesses}
        current={current}
        answer={answer}
      />

      <GameKeyboard 
        statusMap={statusMap}
        onKey={onKey}
      />

      <button 
        className="submit-button"
        onClick={submitGuess}
        disabled={!canSubmit}
      >
        SUBMIT
      </button>

      <GameMessage message={message} />

      <GameControls 
        onHelp={showHelp}
        onNewGame={resetGame}
      />
    </>
  )
}
