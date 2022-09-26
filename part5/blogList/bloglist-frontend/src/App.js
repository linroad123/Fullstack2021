import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const setSortedBlogs = (bl) => {
    setBlogs(
      bl.sort(function (a, b) {
        return b.likes - a.likes
      })
    )
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setSortedBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`user '${username}' logged in successfully`)
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const handleLogOut = () => {
    // window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    setNotification(`user '${username}' logged out successfully`)
    setTimeout(() => setNotification(null), 5000)
  }
  const loggedInDisplay = () => (
    <div>
      <form onSubmit={handleLogOut}>
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </form>
      {user && newBlogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={addLike}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setSortedBlogs(blogs.concat(returnedBlog))
    })
  }

  const newBlogForm = () => (
    <div id="blog-form">
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          setErrorMessage={setErrorMessage}
          setNotification={setNotification}
        />
      </Togglable>
    </div>
  )

  const addLike = (blogID, blogObject) => {
    blogService.update(blogID, blogObject).then((returnedBlog) => {
      const filteredBlogs = blogs.filter((b) => b.id !== blogID)
      setSortedBlogs(filteredBlogs.concat(returnedBlog))
    })
  }
  const deleteBlog = (blogID) => {
    blogService.del(blogID).then(() => {
      const filteredBlogs = blogs.filter((b) => b.id !== blogID)
      setSortedBlogs(filteredBlogs)
    })
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      {user === null ? loginForm() : loggedInDisplay()}
    </div>
  )
}

export default App
