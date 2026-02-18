import React from 'react' // rfce
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Profile from '../pages/profile'
import PrivateRoute from './PrivateRoute'
import MainLayout from '../layouts/MainLayout'
import Events from '../pages/events'
import EventDetail from '../components/EventDetail'

//  23 seconds to midnight Font НА ПОТОМ

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/events/:id" element={<EventDetail />} />

          <Route
              path="profile"
              element={
                  <PrivateRoute>
                      <Profile />
                  </PrivateRoute>
              }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRouter