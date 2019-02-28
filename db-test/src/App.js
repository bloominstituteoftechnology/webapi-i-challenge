import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { ReactComponent as Trash } from './images/trash-2.svg'
import { ReactComponent as Edit } from './images/edit.svg'
import { ReactComponent as Check } from './images/check.svg'
import './App.css'

export default function App() {
  const [users, useUsers] = useState([])
  const [error, useError] = useState('')
  const [editing, useEditing] = useState(false)
  const [currentId, useCurrentId] = useState(null)
  const [currentName, useCurrentName] = useState('')
  const [currentBio, useCurrentBio] = useState('')
  useEffect(
    _ => {
      fetchUsers()
    },
    [users.length < 1]
  )
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
  async function submit() {
    try {
      const res = await axios.put(
        'http://localhost:8888/api/users/' + currentId,
        {
          name: currentName,
          bio: currentBio
        }
      )
      const body = res.data
      const id = res.data.id
      const newUsers = users.map(user => {
        return user.id.toString() === id ? body : user
      })
      useUsers(newUsers)
      useEditing(false)
    } catch (err) {
      useError(err)
    }
  }
  const edit = (id, name, bio) => {
    useCurrentId(id)
    useCurrentName(name)
    useCurrentBio(bio)
    useEditing(!editing)
  }
  const handleChange = e => {
    if (e.target.dataset.name === 'name') useCurrentName(e.target.value)
    else if (e.target.dataset.name === 'bio') useCurrentBio(e.target.value)
  }
  return (
    <div className="container">
      {error && error}
      {users.length > 0 &&
        users.map(({ id, name, bio }) => (
          <div className="card" key={'card-' + id}>
            <h1 className="card_name">
              {editing && currentId === id ? (
                <input
                  type="text"
                  value={currentName}
                  data-name="name"
                  onChange={handleChange}
                />
              ) : (
                name
              )}
            </h1>
            <p className="card_bio">
              {editing && currentId === id ? (
                <input
                  type="text"
                  value={currentBio}
                  data-name="bio"
                  onChange={handleChange}
                />
              ) : (
                bio
              )}
            </p>
            <div className="card_icons">
              {editing && currentId === id ? (
                <Check className="card_check" size="16px" onClick={submit} />
              ) : (
                <Edit
                  className="card_edit"
                  size="16px"
                  onClick={_ => edit(id, name, bio)}
                />
              )}
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
