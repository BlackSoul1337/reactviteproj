import React, { createContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, []) 

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        navigate("/login")
    }

    const toggleBooking = (eventId) => {
        setBookings((prev) => {
            if (prev.includes(eventId)) {
                return prev.filter(id => id !== eventId)
            } else {
                return [...prev, eventId]
            }
        })
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem(`bookings_${user.login}`, JSON.stringify(bookings))
        }
    }, [bookings, user])

    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem(`bookings_${user.login}`)
        } else {
            setBookings([])
        }
    }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, bookings, toggleBooking }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}