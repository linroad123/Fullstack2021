import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = ({anecdotes}) => {
  const length = anecdotes.length
  const randomNum = Math.floor(Math.random()*length)
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(new Array(length).fill(0))
  const max = points.indexOf(Math.max(...points))

  const vote = () => {
    const copy = [...points]
    copy[selected]+=1
    setPoints(copy)
  }

  const nextAnecdote = () => (setSelected(randomNum))
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={vote}/>
      <Button text='next anecdote' handleClick={nextAnecdote} />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
      <p>has {points[max]} votes</p>
    </div>
  )
}

export default App
