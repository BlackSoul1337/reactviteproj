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

    // const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formData)
        const type = validate(formData.login)

        if (type === "invalid") {
            return
        }

        const userData = {
            login: formData.login,
            type: type,
            token: "a123"
        }
        
        if (type !== "invalid") {
            login(userData)  //localStorage.setItem("user", JSON.stringify(userData))
            navigate("/profile")
        }
    }


    const validate = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
        const phoneRegex = /^(8|\+7)(\s|\(|-)?(\d{3})(\s|\)|-)?(\d{3})(\s|-)?(\d{2})(\s|-)?(\d{2})$/

        if(emailRegex.test(value)) return "email"
        if(phoneRegex.test(value)) return "phone"
        if(value.length >= 3) return "username"
        return "invalid"
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <h2>Auth</h2>
            <input 
                type="text"
                placeholder='E U P'
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
            />
            <input 
                type="password"
                name="password"
                placeholder='Pass'
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">delaem</button>
        </form>

        <div>
            <img src='https://avatars.mds.yandex.net/i?id=bcf2ef6fd8cee5ef58883591f7d83c2e01c19bc0-12753003-images-thumbs&n=13' />
        </div>
    </div>
  )
}

export default Login
