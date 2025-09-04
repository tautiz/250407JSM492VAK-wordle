import React from 'react'

export function GameControls({ onHelp, onNewGame }) {
  return (
    <div className="help">
      <button onClick={onHelp}>Pagalba</button>
      <button onClick={onNewGame}>Naujas žaidimas</button>
    </div>
  )
}
