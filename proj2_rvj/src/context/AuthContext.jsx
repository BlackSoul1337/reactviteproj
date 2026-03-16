import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        const savedToken = localStorage.getItem("token")
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }
    }, []) 

    const login = (userData, jwtToken) => {
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", jwtToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/login")
    }

    const toggleBookings = (eventId) => {
        setBookings((prev) => {
            const updated = prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
            localStorage.setItem(`bookings_${user?.login || user?.email}`, JSON.stringify(updated))
            return updated
        })
    }

    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem(`bookings_${user.login || user.email}`)
            if (saved) {setBookings(JSON.parse(saved))} else {setBookings([])}
        } else {
            setBookings([])
        }
    }, [user])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, bookings, toggleBookings }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}