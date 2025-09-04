import React from 'react'

export function GameKeyboard({ statusMap, onKey }) {
  return (
    <div className="keyboard">
      {['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((row, ri) => (
        <div className="krow" key={ri}>
          {row.split('').map(k => {
            const st = statusMap[k] || ''
            return <button key={k} className={"key " + st} onClick={() => onKey(k)}>{k}</button>
          })}
          {ri === 2 && <button className="key action" onClick={() => onKey('Backspace')}>⌫</button>}
        </div>
      ))}
    </div>
  )
}
