import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../src/app/App'
import * as wordsMod from '../src/shared/lib/words'
import { vi } from 'vitest'

describe('App behavior', ()=>{
  it('loses after 6 wrong guesses and reveals answer', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zalia')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

  const { container } = render(<App />)

    for(let i=0;i<6;i++){
      await userEvent.keyboard('abcde')
      await userEvent.keyboard('{Enter}')
    }

    expect(screen.getByText(/Pralaimėjai/)).toBeInTheDocument()

    vi.restoreAllMocks()
  })

  it('keyboard keys get colored after guesses', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('apple')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

    render(<App />)

    // guess with some overlapping letters
    await userEvent.keyboard('pleap')
    await userEvent.keyboard('{Enter}')

    // keys p, l, e, a should have statuses (present or correct)
    const pKey = screen.getByRole('button', {name: 'p'})
    expect(pKey.className.includes('present') || pKey.className.includes('correct')).toBe(true)

    vi.restoreAllMocks()
  })

  it('New game resets board and messages', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zodis')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

  const { container } = render(<App />)

  await userEvent.keyboard('zodis')
  await userEvent.keyboard('{Enter}')
  expect(screen.getByText(/Sveikiname/)).toBeInTheDocument()

  // click New game button
  const btn = screen.getByText('Naujas žaidimas')
  await userEvent.click(btn)

  // after reset, message should show new game text or be cleared but grid first row empty
  const cells = container.querySelectorAll('.grid .row:first-child .cell')
  const anyFilled = Array.from(cells).some(c=>c.textContent && c.textContent.trim().length>0)
  expect(anyFilled).toBe(false)

    vi.restoreAllMocks()
  })
})
