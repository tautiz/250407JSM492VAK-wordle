import { describe, it, expect } from 'vitest'
import { evaluate } from '../src/evaluate'

describe('evaluate', ()=>{
  it('marks correct letters', ()=>{
    expect(evaluate('apple','apple')).toEqual(['correct','correct','correct','correct','correct'])
  })
  it('marks present letters', ()=>{
    // guess has letters that exist but different positions
    expect(evaluate('pleap','apple')).toEqual(['present','present','present','present','present'])
  })
  it('handles duplicate letters correctly', ()=>{
    // answer has one p, guess has two p's -> only one should be present/correct
    expect(evaluate('ppaaa','pqrst')).toEqual(['correct','absent','absent','absent','absent'])
  })
})
