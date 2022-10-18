import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Col, Row } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className="mt-5">
      <h2>Login </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Username:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Your Username"
              name="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Your Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" id="login-button" type="submit">
              Login
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
