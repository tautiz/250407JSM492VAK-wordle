import React from 'react'

export function GameMessage({ message }) {
  if (!message) return null
  
  return <div className="message">{message}</div>
}
