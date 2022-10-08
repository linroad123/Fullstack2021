import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // Checking if input is empty before adding, did this for fun :)
    if (content === '') {
      props.setNotification(`Anecdote missing`, 5000)

    } else {
      props.createAnecdote(content)
      props.setNotification(`you added '${content}'`, 5000)
    }
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
