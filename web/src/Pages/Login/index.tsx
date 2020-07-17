import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

const Login = () => {

    interface IUser {
        token: string,
        user: {
            id: number,
            login: string,
            nickname: string
        }
    }

    const history = useHistory()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const user = await axios.post<IUser>("/users/signin", {
            login,
            password
        })

        if(!user) {
            alert("User not found!")
            return
        }

        console.log(user)

        // history.push("/profile", {
        //     user: user.data.user
        // })
        
    }

    return (
        <div className="login-container">
            <form>
                <div className="form-image"></div>
                <input value={login} onChange={e => setLogin(e.target.value)}
                required placeholder="login" type="text"/>
                <input value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="password" type="password"/>
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login