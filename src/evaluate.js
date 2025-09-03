// evaluate(guess, answer) -> returns array of statuses: 'correct', 'present', 'absent'
export function evaluate(guess, answer){
  guess = guess.toLowerCase()
  answer = answer.toLowerCase()
  const result = Array(5).fill('absent')
  const answerChars = answer.split('')

  // first pass: correct
  for(let i=0;i<5;i++){
    if(guess[i] === answerChars[i]){
      result[i] = 'correct'
      answerChars[i] = null // consume
    }
  }

  // second pass: present
  for(let i=0;i<5;i++){
    if(result[i] === 'correct') continue
    const idx = answerChars.indexOf(guess[i])
    if(idx !== -1){
      result[i] = 'present'
      answerChars[idx] = null // consume
    }
  }
  return result
}
