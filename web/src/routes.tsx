import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import PostPage from './Pages/PostPage'
import Profile from './Pages/Profile'
//import Search from './Pages/Search'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/post/:path" exact component={PostPage} />
        </BrowserRouter>
    )
}

export default Routes