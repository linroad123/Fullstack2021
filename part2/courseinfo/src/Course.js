import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <>
      {props.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </>
  )
}
const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <p><b>total of {total} exercises </b></p>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
export default Course