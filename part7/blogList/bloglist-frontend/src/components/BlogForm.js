import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'

const BlogForm = ({ createBlog, setNotification, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  const addBlog = (event) => {
    event.preventDefault()

    try {
      const blog = createBlog({
        title,
        author,
        url
      })
      setBlogs([...blogs, blog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog '${title}' by ${author} added`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Error occured')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div className="mt-5">
      <h2>Create New Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Blog Title"
              value={title}
              id="title"
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Blog Author"
              value={author}
              id="author"
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            URL
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Blog URL"
              value={url}
              id="url"
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button id="create-button" type="submit">
              create
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
export default BlogForm
