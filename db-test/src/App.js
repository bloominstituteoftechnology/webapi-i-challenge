import React, { useState, useEffect } from 'react'

import { ReactComponent as Trash } from './images/trash-2.svg'
import { ReactComponent as Edit } from './images/edit.svg'
import './App.css'

export default function App() {
  const [users, useUsers] = useState([])
  const [error, useError] = useState('')
  useEffect(_ => {
    fetchUsers()
  })
  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:8888/api/users')
      const body = await response.json()
      useUsers(body)
    } catch (e) {
      useError(e.message)
    }
  }
  async function deleteUser(id) {
    try {
      const response = await fetch('http://localhost:8888/api/users/' + id, {
        method: 'DELETE'
      })
      const body = await response.json()
      const newUsers = users.filter(user => user.id !== body.id)
      useUsers(newUsers)
    } catch (e) {
      useError(e.message)
    }
  }
  return (
    <div className="container">
      {error && error}
      {users.length > 0 &&
        users.map(({ id, name, bio }) => (
          <div className="card" key={'card-' + id}>
            <h1 className="card_name">{name}</h1>
            <p className="card_bio">{bio}</p>
            <div className="card_icons">
              <Edit className="card_edit" size="16px" />
              <Trash
                className="card_delete"
                size="16px"
                onClick={_ => deleteUser(id)}
              />
            </div>
          </div>
        ))}
    </div>
  )
}
