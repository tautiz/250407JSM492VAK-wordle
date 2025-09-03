import React, { useEffect, useState } from 'react'
import { WORDS, isValidWord, pickRandom } from './words'
import { evaluate } from './evaluate'

const EMPTY_ROW = Array.from({length:5},()=>'')

export default function App(){
  const [answer, setAnswer] = useState('')
  const [guesses, setGuesses] = useState([]) // each guess string
  const [current, setCurrent] = useState('')
  const [message, setMessage] = useState('')
  const [won, setWon] = useState(false)

  useEffect(()=>{
    setAnswer(pickRandom())
  },[])

  useEffect(()=>{
    if(message){
      const t = setTimeout(()=>setMessage(''),3000)
      return ()=>clearTimeout(t)
    }
  },[message])

  function onKey(key){
    if(won || guesses.length>=6) return
    if(key === 'Enter'){
      if(current.length !==5){
        setMessage('Neužpildytas žodis — įveskite 5 raides prieš patvirtinimą.')
        return
      }
      if(!isValidWord(current)){
        setMessage('Žodis neegzistuoja esamam žodyne — patikrinkite rašybą arba pasirinkite kitą žodį.')
        return
      }
      const next = [...guesses, current]
      setGuesses(next)
      setCurrent('')
      if(current === answer){
        setWon(true)
        setMessage('Sveikiname! Žodį atspėjote!')
      }else if(next.length>=6){
        setMessage(`Pralaimėjai — teisingas žodis: ${answer}`)
      }
      return
    }
    if(key === 'Backspace'){
      setCurrent(s=>s.slice(0,-1))
      return
    }
    if(current.length<5 && /^[a-zA-Z]$/.test(key)){
      setCurrent(s=> (s+key.toLowerCase()).slice(0,5))
    }
  }

  useEffect(()=>{
    function handler(e){
      if(e.key === 'Enter') onKey('Enter')
      else if(e.key === 'Backspace') onKey('Backspace')
      else if(e.key.length===1) onKey(e.key)
    }
    window.addEventListener('keydown', handler)
    return ()=>window.removeEventListener('keydown', handler)
  },[current,guesses,answer,won])

  // compute keyboard colors
  const statusMap = {}
  for(const g of guesses){
    const ev = evaluate(g, answer)
    for(let i=0;i<5;i++){
      const ch = g[i]
      const st = ev[i]
      const prev = statusMap[ch]
      if(prev === 'correct') continue
      if(prev === 'present' && st === 'absent') continue
      statusMap[ch] = st
    }
  }

  return (
    <div className="app">
      <h1>Wordle — MVP</h1>
      <p className="muted">Atspėkite 5 raidžių žodį per 6 bandymus. Enter=siųsti, Backspace=trinti.</p>

      <div className="grid">
        {Array.from({length:6}).map((_,row)=>{
          const guess = guesses[row] || (row===guesses.length ? current : '')
          return (
            <div className="row" key={row}>
              {Array.from({length:5}).map((_,i)=>{
                const ch = (guess && guess[i]) || ''
                let cls = 'cell'
                if(guesses[row]){
                  const st = evaluate(guesses[row], answer)[i]
                  cls += ' ' + st
                } else if(row === guesses.length && ch){
                  cls += ' filled'
                }
                return <div key={i} className={cls}>{ch}</div>
              })}
            </div>
          )
        })}
      </div>

      <div className="keyboard">
        {['qwertyuiop','asdfghjkl','zxcvbnm'].map((row,ri)=> (
          <div className="krow" key={ri}>
            {row.split('').map(k=>{
              const st = statusMap[k] || ''
              return <button key={k} className={"key " + st} onClick={()=>onKey(k)}>{k}</button>
            })}
            {ri===1 && <button className="key action" onClick={()=>onKey('Enter')}>Enter</button>}
            {ri===2 && <button className="key action" onClick={()=>onKey('Backspace')}>⌫</button>}
          </div>
        ))}
      </div>

      {message && <div className="message">{message}</div>}

      <div className="help">
        <button onClick={()=>setMessage('Žaidimas: 5 raidžių žodžiai, 6 bandymai. Enter=siųsti, Backspace=trinti.')}>Pagalba</button>
        <button onClick={()=>{setAnswer(pickRandom()); setGuesses([]); setCurrent(''); setWon(false); setMessage('Naujas žaidimas pradėtas')}}>Naujas žaidimas</button>
      </div>

    </div>
  )
}
