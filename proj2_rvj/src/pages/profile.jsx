import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Profile() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>Профиль</h1>
      <div>
        <p>Пользователь: {user.username || user.email}</p>
        <p>Email: {user.email}</p>
        {user.phone && <p>Телефон: {user.phone}</p>}
        {user.type && <p>Тип: {user.type}</p>}
      </div>
      <button onClick={logout}>Выйти</button>
    </div>
  )
}

export default Profile