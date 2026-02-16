import React from 'react' // rfce
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Profile from '../pages/profile'
import PrivateRoute from './PrivateRoute'

function AppRouter() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />

        <Route
            path="/profile"
            element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            }
        />
        
      </Routes>
    </div>
  )
}

export default AppRouter