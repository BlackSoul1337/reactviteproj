import React, { useContext } from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Login() {

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            const savedUser = JSON.parse(localStorage.getItem("registeredUser"))

            const userData = {
                login: savedUser.username,
                type: savedUser.type,
                token: "a123"
            }
            login(userData)
            navigate("/profile")
        }

    }


    const validate = () => {
        let newErrors = {}
        const savedUser = JSON.parse(localStorage.getItem("registeredUser"))
        const trimmedLogin = formData.login.trim()
        if (!trimmedLogin) {
            newErrors.login = "Логин обязателен"
        }
        if (!savedUser) {
            newErrors.login = "Пользователь не найден"
        } else if (savedUser.username !== formData.login && savedUser.email !== formData.login && savedUser.phone !== formData.login) {
            newErrors.login = "Неверный логин"
        } else if (savedUser.password !== formData.password) {
            newErrors.password = "Неверный пароль"
        }

        return newErrors
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input 
                type="text"
                placeholder='Ник/почта/телефон'
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
            />
            {errors.login && <p>{errors.login}</p>}
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
