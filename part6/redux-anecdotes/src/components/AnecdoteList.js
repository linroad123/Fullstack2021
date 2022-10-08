import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state
      .anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort(function (a, b) {
        return b.votes - a.votes
      })
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    console.log(anecdote)
    dispatch(voteForAnecdote(anecdote))
    // dispatch(setNotification(`you voted '${anecdote.content}'`))
    // setTimeout(() => dispatch(clearNotification()), 5000)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} handleClick={() => vote(anecdote)} />
      ))}
    </div>
  )
}
export default AnecdoteList
