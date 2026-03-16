import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Login() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setServerError("")
        const validationErrors = validate()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch("/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || "Ошибка входа")
                }


                login(data.user || { email: formData.email, type: "user" }, data.token)
                navigate("/profile")

            } catch (err) {
                setServerError(err.message)
            }
        }
    }

    const validate = () => {
        let newErrors = {}
        const trimmedEmail = formData.email.trim()
        if (!trimmedEmail) {
            newErrors.email = "Email обязателен"
        }
        if (!formData.password) {
            newErrors.password = "Пароль обязателен"
        }

        return newErrors
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Вход</h2>
                {serverError && <p style={{ color: 'red', fontWeight: 'bold' }}>{serverError}</p>}
                <input
                    type="text"
                    placeholder='Почта (Email)'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                    type="password"
                    name="password"
                    placeholder='Пароль'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Войти</button>
            </form>

            <div>
                <img src='https://avatars.mds.yandex.net/i?id=bcf2ef6fd8cee5ef58883591f7d83c2e01c19bc0-12753003-images-thumbs&n=13' />
            </div>
        </div>
    )
}

export default Login
