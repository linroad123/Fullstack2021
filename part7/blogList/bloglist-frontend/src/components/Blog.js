import React from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const addLike = () => {
    updateBlog(blog.id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }
  const removeBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))
      deleteBlog(blog.id)
  }

  return (
    <div>
      <h2 className="mt-5">{blog.title}</h2>
      <p className="lead">By: {blog.author}</p>

      <p className="lead">
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p id={`${blog.title}-likes`} className="lead">
        {blog.likes}{' '}
      </p>
      <button
        className="btn btn-lg btn-primary"
        id={`${blog.title}-like-button`}
        onClick={addLike}
      >
        like
      </button>
      <p className="lead"> Posted by: {blog.user.username}</p>
      {user && user.username === blog.user.username && (
        <button
          className="btn btn-lg btn-danger"
          id={`${blog.title}-remove-button`}
          onClick={removeBlog}
        >
          remove
        </button>
      )}
    </div>
  )
}

export default Blog
