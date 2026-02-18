import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function MainLayout() {

    const {user, logout} = useContext(AuthContext)

  return (
    <div>
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/events">Events</NavLink>

                {!user && <NavLink to="/login">Login</NavLink>}
                {!user && <NavLink to="/registration">Registration</NavLink>}
                {user && <NavLink to="/profile">Profile</NavLink>}
            </nav>
        </header>

        <main>
            <Outlet />
        </main>

        <footer>
            <p>Footer</p>
        </footer>

    </div>
  )
}

export default MainLayout