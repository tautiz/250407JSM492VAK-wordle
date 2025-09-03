import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'
import * as wordsMod from '../src/words'
import { vi } from 'vitest'

describe('App integration', ()=>{
  it('renders grid and accepts typing and backspace/enter with messages', async ()=>{
  // stub pickRandom to return deterministic answer
  vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('zodis')
  vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

  const { container } = render(<App />)

  // type 4 letters and press Enter -> should show 'not filled' message
  await userEvent.keyboard('abcd')
  await userEvent.keyboard('{Enter}')
  expect(screen.getByText(/Neužpildytas/)).toBeInTheDocument()

  // clear current input and type valid 5-letter word (from WORDS) and submit
  await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}')
  await userEvent.keyboard('zodis')
  await userEvent.keyboard('{Enter}')
  // message may be rendered inside .message div; search by substring in container
  expect(container.querySelector('.message').textContent).toMatch(/Sveikiname/)

  vi.restoreAllMocks()
  })
})
