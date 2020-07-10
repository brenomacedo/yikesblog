import React from 'react'
import './styles.css'

const Login = () => {
    return (
        <div className="login-container">
            <form>
                <input required placeholder="login" type="text"/>
                <input required placeholder="password" type="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login