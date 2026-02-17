import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const navigate = useNavigate()

  const rawData = localStorage.getItem("user")
  const user = rawData ? JSON.parse(rawData) : null

  if (!user) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("user")

    navigate("/login")
  }

  return (
    <div>
      <h1>PROFILE</h1>
      <div>
        <p>User : {user.username || user.login}</p>
        <p>Type : {user.type}</p>
      </div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Profile