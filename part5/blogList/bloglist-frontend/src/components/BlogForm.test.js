import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm
      createBlog={createBlog}
      setErrorMessage={jest.fn()}
      setNotification={jest.fn()}
    />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Author1' },
  })
  fireEvent.change(title, {
    target: { value: 'Title1' },
  })
  fireEvent.change(url, {
    target: { value: 'url1.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title1')
  expect(createBlog.mock.calls[0][0].author).toBe('Author1')
  expect(createBlog.mock.calls[0][0].url).toBe('url1.com')
})
