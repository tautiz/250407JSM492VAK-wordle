import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from '../src/app/App'
import * as wordsMod from '../src/shared/lib/words'

// accessibility: ensure help button and message are focusable
describe('App accessibility basics', ()=>{
  it('help button displays instructions', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zodis')
    render(<App />)

    const helpBtn = screen.getByText('Pagalba')
    await userEvent.click(helpBtn)
    expect(screen.getByText(/Žaidimas: 5 raidžių žodžiai/)).toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
