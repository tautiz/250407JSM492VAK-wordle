import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from '../src/app/App'
import * as wordsMod from '../src/shared/lib/words'

describe('App keyboard interactions and precedence', ()=>{
  it('on-screen keyboard clicks type letters and submit works', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('apple')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

  const { container } = render(<App />)
  // click keyboard buttons (query by role to avoid grid cells)
  const keyButtons = Array.from(container.querySelectorAll('button.key'))
  const findKey = (ch)=> keyButtons.find(b=>b.textContent.trim()===ch)
  await userEvent.click(findKey('p'))
  await userEvent.click(findKey('l'))
  await userEvent.click(findKey('e'))
  await userEvent.click(findKey('a'))
  await userEvent.click(findKey('p'))

    // submit
    await userEvent.click(screen.getByText('Enter'))

  // after guess, keyboard keys p,l,e,a should have classes (present or correct)
  const keyButtonsAfter = Array.from(container.querySelectorAll('button.key'))
  const pKey = keyButtonsAfter.find(b=>b.textContent.trim()==='p')
  expect(pKey.className.includes('present') || pKey.className.includes('correct')).toBe(true)

    vi.restoreAllMocks()
  })

  it('status precedence: correct > present > absent', async ()=>{
    vi.spyOn(wordsMod, 'pickRandom').mockReturnValue('apple')
    vi.spyOn(wordsMod, 'isValidWord').mockReturnValue(true)

  const { container } = render(<App />)

    // first guess 'pleap' will mark many letters as present
    await userEvent.keyboard('pleap')
    await userEvent.keyboard('{Enter}')

    // then guess 'apple' which should upgrade keys to correct
    await userEvent.keyboard('apple')
    await userEvent.keyboard('{Enter}')

  // find the keyboard button for 'p'
  const keyButtons2 = Array.from(container.querySelectorAll('button.key'))
  const pKeyboardBtn = keyButtons2.find(b=>b.textContent.trim()==='p')
  expect(pKeyboardBtn.className.includes('correct')).toBe(true)

    vi.restoreAllMocks()
  })
})
