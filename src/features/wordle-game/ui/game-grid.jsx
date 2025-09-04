import React from 'react'
import { evaluate } from '../../../shared/lib/evaluate'

export function GameGrid({ guesses, current, answer }) {
  return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, row) => {
        const guess = guesses[row] || (row === guesses.length ? current : '')
        return (
          <div className="row" key={row}>
            {Array.from({ length: 5 }).map((_, i) => {
              const ch = (guess && guess[i]) || ''
              let cls = 'cell'
              if (guesses[row]) {
                const st = evaluate(guesses[row], answer)[i]
                cls += ' ' + st
              } else if (row === guesses.length && ch) {
                cls += ' filled'
              }
              return <div key={i} className={cls}>{ch}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}
