import React from 'react'
import {useState} from 'react'

function Login() {

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
        console.log(formData)

        const userData = {
            username: "A",
            email: "a@gmail.com",
            token: "a123"
        }

        localStorage.setItem("user", JSON.stringify(userData))
        alert("Test")
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
    </div>
  )
}

export default Login