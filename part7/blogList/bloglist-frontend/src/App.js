import React, { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import Header from './components/Header'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

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
        password
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

  const handleLogOut = () => {
    window.localStorage.clear()
    setNotification(`user '${username}' logged out successfully`)
    setTimeout(() => setNotification(null), 5000)
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setSortedBlogs(blogs.concat(returnedBlog))
    })
  }

  const newBlogForm = () => (
    <div id="blog-form">
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
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
  const blogByID = (id) => blogs.find((a) => a.id === id)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogByID(match.params.id) : null

  return (
    <div>
      <Header user={user} handleLogOut={handleLogOut} />
      <div className="container">
        <Notification message={notification} />
        <Error message={errorMessage} />
        <Routes>
          <Route
            path="/"
            element={
              user === null ? (
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleSubmit={handleLogin}
                />
              ) : (
                <div>
                  {newBlogForm()}
                  <BlogList blogs={blogs} />
                </div>
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                updateBlog={addLike}
                deleteBlog={deleteBlog}
                user={user}
              />
            }
          />
          <Route
            path="/users"
            element={
              <div>
                <h2 className="mt-5">Users Page</h2>
                <p className="lead">
                  This should one day be a users page... Tody is not that day
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
