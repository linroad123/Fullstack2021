import React, { useState } from 'react'

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
        url,
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
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            id="title"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            id="author"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            id="url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
