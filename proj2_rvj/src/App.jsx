import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Home from './components/home'

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
