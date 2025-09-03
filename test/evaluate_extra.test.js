import { describe, it, expect } from 'vitest'
import { evaluate } from '../src/evaluate'

describe('evaluate extra cases', ()=>{
  it('handles no matches', ()=>{
    expect(evaluate('abcde','fghij')).toEqual(['absent','absent','absent','absent','absent'])
  })
  it('handles repeated letters in answer', ()=>{
    // 'allee' -> a l l e e, guess 'eagle' should consume e's and l/presence
    expect(evaluate('eagle','allee')).toEqual(['present','present','absent','present','correct'])
  })
  it('handles repeated letters in guess with single in answer', ()=>{
    expect(evaluate('aabcd','axxxx')).toEqual(['correct','absent','absent','absent','absent'])
  })
})
