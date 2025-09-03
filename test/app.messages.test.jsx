import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from '../src/App'
import * as wordsMod from '../src/words'

describe('App messages and timeout', ()=>{
  it('shows and auto-hides message after 3s', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zodis')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

    render(<App />)

    await userEvent.keyboard('abcd')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByText(/Neužpildytas/)).toBeInTheDocument()

    // wait up to 4s for the message to disappear
    await waitFor(()=>{
      expect(screen.queryByText(/Neužpildytas/)).toBeNull()
    }, {timeout: 4000})

    vi.restoreAllMocks()
  })

  it('shows invalid word message when word not in dictionary', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zodis')
    // make isValidWord return false for 'xxxxx'
    vi.spyOn(wordsMod, 'isValidWord').mockImplementation((w)=> w !== 'xxxxx')

    render(<App />)

    await userEvent.keyboard('xxxxx')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByText(/Žodis neegzistuoja/)).toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
