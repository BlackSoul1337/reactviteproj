import React from 'react' // rfce
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Profile from '../pages/profile'
import PrivateRoute from './PrivateRoute'
import MainLayout from '../layouts/MainLayout'
import Events from '../pages/events'
import EventDetail from '../components/EventDetail'
import Registration from '../pages/registration'
import Bookings from '../pages/bookings'
import About from '../pages/about'

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events/>} />
          <Route path="/events/:id" element={<EventDetail />} />

          <Route
              path="profile"
              element={
                  <PrivateRoute>
                      <Profile />
                      <Bookings />
                  </PrivateRoute>
              }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRouter