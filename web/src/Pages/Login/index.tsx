import React, { useState, FormEvent, useEffect } from 'react'
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

    useEffect(() => {
        console.log(sessionStorage.getItem("token"))
        if(sessionStorage.getItem("token")) {
            axios.get("/auth", {
                headers: {
                    authorization: sessionStorage.getItem("token")
                }
            }).then(resp => {
                history.push("/profile", {
                    user: resp.data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    const history = useHistory()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
        try {
            const user = await axios.post<IUser>("/users/signin", {
                login,
                password
            })

            axios.defaults.headers.authorization = `Bearer ${user.data.token}`
            sessionStorage.setItem("token", `Bearer ${user.data.token}`)

            history.push("/profile", {
                user: user.data.user
            })
        } catch (e) {
            alert("user not found!")
        }
    
        
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