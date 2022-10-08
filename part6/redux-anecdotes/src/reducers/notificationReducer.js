import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

const { showNotification, clearNotification } = notificationSlice.actions
export const setNotification = (message, timeout) => {
  let notificationTimeout
  return dispatch => {
    clearTimeout(notificationTimeout)
    dispatch(showNotification(message))
    notificationTimeout = setTimeout(() => dispatch(clearNotification()), timeout)
  }
}
export default notificationSlice.reducer 