// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = [], action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'NEW':
//       return [...state, action.data]
//     case 'VOTE':
//       const id = action.data.id
//       const anecdoteToVote = state.find((n) => n.id === id)
//       const updatedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       }
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : updatedAnecdote
//       )
//     case 'INIT':
//       return action.data
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW',
//     data: {
//       content,
//       votes: 0,
//     },
//   }
// }
// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id },
//   }
// }

// export const initializeAnecdotes = (anecdotes) => {
//   return {
//     type: 'INIT',
//     data: anecdotes,
//   }
// }


// export default reducer

import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const updatedAnecdote = action.payload
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
    },
    initialize(state, action) {
      return action.payload
    }
  }
})
const { addVote, create, initialize } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initialize(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(create(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote.id)
    dispatch(addVote(votedAnecdote))
  }
}
 export default anecdoteSlice.reducer