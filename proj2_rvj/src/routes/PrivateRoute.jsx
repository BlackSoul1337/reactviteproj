import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext)
    // const rawUser = localStorage.getItem("user") // na potom: JSON.stringify(obj) JSON.parse(string)
    // const user = JSON.parse(rawUser)

    if (user) {
        return children;
    } else {
        return <Navigate to ="/login" />
    }
}

export default PrivateRoute
