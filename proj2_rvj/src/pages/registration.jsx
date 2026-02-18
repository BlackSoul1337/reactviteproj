import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'

function Registration() {

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    r_password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegistration = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        type: "user"
      }
      localStorage.setItem("registeredUser", JSON.stringify(newUser))
      navigate("/login")
    }
  }

  const validate = () => {
    let newErrors = {}
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^(8|\+7)(\s|\(|-)?(\d{3})(\s|\)|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/
    if (formData.password !== formData.r_password) {newErrors.r_password = "Passwords dont match"}
    if (!formData.username.trim() || formData.username.length < 3) {newErrors.username = "Короткое или пустое имя"}
    if (!emailRegex.test(formData.email)) {newErrors.email = "Некорректная почта"}
    if (!phoneRegex.test(formData.phone)) {newErrors.phone = "Некорректный телефон"}
    return newErrors
  }

  return (
    <div>
      <form onSubmit={handleRegistration}>
        <h2>Регистрация</h2>
        <input type="text" placeholder="Никнейм" name="username" value={formData.username} onChange={handleChange} required />
        {errors.username && <p>{errors.username}</p>}
        <input type="email" placeholder="Почта" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p>{errors.email}</p>}
        <input type="phone" placeholder="Телефон" name="phone" value={formData.phone} onChange={handleChange} required />
        {errors.phone && <p>{errors.phone}</p>}
        <input type="password" placeholder="Пароль" name="password" value={formData.password} onChange={handleChange} required />
        {errors.password && <p>{errors.password}</p>}
        <input type="password" placeholder="Повторите пароль" name="r_password" value={formData.r_password} onChange={handleChange} required />
        {errors.r_password && <p>{errors.r_password}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Registration