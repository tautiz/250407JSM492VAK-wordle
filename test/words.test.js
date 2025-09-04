import { describe, it, expect } from 'vitest'
import { isValidWord, pickRandom, WORDS } from '../src/shared/lib/words'

describe('words module', ()=>{
  it('has WORDS array with entries', ()=>{
    expect(Array.isArray(WORDS)).toBe(true)
    expect(WORDS.length).toBeGreaterThanOrEqual(50)
  })
  it('isValidWord recognizes known words', ()=>{
    expect(isValidWord(WORDS[0])).toBe(true)
    expect(isValidWord(WORDS[0].toUpperCase())).toBe(true)
  })
  it('isValidWord rejects unknown words', ()=>{
    expect(isValidWord('xxxxx')).toBe(false)
  })
  it('pickRandom returns a value from WORDS', ()=>{
    const val = pickRandom()
    expect(WORDS.includes(val)).toBe(true)
  })
})
