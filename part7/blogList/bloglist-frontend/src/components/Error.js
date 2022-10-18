import React from 'react'
import { Alert } from 'react-bootstrap'

const Error = ({ message }) => {
  if (message === null) return null
  return (
    <div className="container">
      <Alert variant="danger">{message}</Alert>
    </div>
  )
}
export default Error
