import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog(blog.id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
  }
  const removeBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))
      deleteBlog(blog.id)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog-entry" style={blogStyle}>
      {blog.title} {blog.author}
      <button id={`${blog.title}-toggle`} onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div
        className="additional_parameters"
        style={{ display: visible ? '' : 'none' }}
      >
        <p>{blog.url}</p>
        <p id={`${blog.title}-likes`}>
          {blog.likes}{' '}
          <button id={`${blog.title}-like-button`} onClick={addLike}>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
        {user && user.username === blog.user.username && (
          <button id={`${blog.title}-remove-button`} onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
