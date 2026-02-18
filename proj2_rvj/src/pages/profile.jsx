import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Profile() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // const rawData = localStorage.getItem("user")
  // const user = rawData ? JSON.parse(rawData) : null
  console.log(user)
  if (!user) {
    return null
  }

  // const handleLogout = () => {
  //   localStorage.removeItem("user")

  //   navigate("/login")
  // }
  return (
    <div>
      <h1>PROFILE</h1>
      <div>
        <p>User : {user.username || user.login}</p> {/* user?.login */}
        <p>Type : {user.type}</p>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Profile