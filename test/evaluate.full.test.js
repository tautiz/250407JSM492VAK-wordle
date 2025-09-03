import { describe, it, expect } from 'vitest'
import { evaluate } from '../src/evaluate'

describe('evaluate comprehensive cases', ()=>{
  it('all correct', ()=>{
    expect(evaluate('apple','apple')).toEqual(['correct','correct','correct','correct','correct'])
  })

  it('repeated letters in answer consumed correctly', ()=>{
    // answer has repeated b's
    expect(evaluate('ababa','abbba')).toEqual(['correct','correct','absent','correct','correct'])
  })

  it('guess has more occurrences than answer', ()=>{
    expect(evaluate('ppppp','apple')).toEqual(['absent','correct','correct','absent','absent'])
  })

  it('case-insensitive matching', ()=>{
    expect(evaluate('Apple','aPpLe')).toEqual(['correct','correct','correct','correct','correct'])
  })

  it('no matches', ()=>{
    expect(evaluate('abcde','fghij')).toEqual(['absent','absent','absent','absent','absent'])
  })
})
