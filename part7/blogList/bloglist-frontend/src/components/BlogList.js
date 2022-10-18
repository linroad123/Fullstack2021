import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => (
  <div className="mt-5">
    <h2>Blogs</h2>
    <Table striped>
      <thead>
        <tr>
          <td>Blog Title</td>
          <td>Author</td>
          <td>Uploaded By</td>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
            </td>
            <td>{blog.author}</td>
            <td>{blog.user.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)
export default BlogList
