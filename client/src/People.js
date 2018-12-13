import React from 'react'

export default function People(props) {
  return (
    <div>
      {props.name}:
      {' '}
      {props.bio}
    </div>
  )
}
