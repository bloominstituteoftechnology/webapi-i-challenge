import React, { useState, useEffect } from 'react'

import { ReactComponent as Trash } from './images/trash-2.svg'
import { ReactComponent as Edit } from './images/edit.svg'
import './App.css'

export default function App() {
  const [users, useUsers] = useState([])
  const [error, useError] = useState('')
  useEffect(_ => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8888/api/users')
        const body = await response.json()
        useUsers(body)
        console.log(body)
      } catch (e) {
        useError(e.message)
        console.log(e.message)
      }
    }
    fetchUsers()
  })
  return (
    <div className="container">
      {error && error}
      {users.length > 0 &&
        users.map(({ name, bio }) => (
          <div className="card">
            <h1 className="card_name">{name}</h1>
            <p className="card_bio">{bio}</p>
            <div className="card_icons">
              <Edit className="card_edit" size="16px" />
              <Trash className="card_delete" size="16px" />
            </div>
          </div>
        ))}
    </div>
  )
}
