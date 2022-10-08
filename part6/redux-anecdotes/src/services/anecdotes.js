import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async (anecdote) => {
  const anecdoteObject = {
    votes: 0,
    content: anecdote,
    id: (100000 * Math.random()).toFixed(0)
  }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}
const vote = async (id) => {
  const anecdote = await getAnecdote(id)
  const votedAnecdote = { ...anecdote, votes: anecdote.votes += 1 }
  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response.data
}

export default { getAll, create, vote }
