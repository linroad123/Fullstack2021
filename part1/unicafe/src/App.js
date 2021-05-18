import React, { useState } from 'react'

const Button = ({title,onclick}) => (
  <button onClick={onclick}>{title}</button>
)

const Statistic = ({text,value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = (props) => {
  const {good,bad,neutral} = props
  const total = good+bad+neutral
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="total" value ={total} />
          <Statistic text="average" value ={(good-bad)/total} />
          <Statistic text="positive" value ={good/total*100 + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button title="Good" onclick={() => setGood(good+1)} />
      <Button title="Neutral" onclick={() => setNeutral(neutral+1)} />
      <Button title="Bad" onclick={() => setBad(bad+1)} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
