import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

const TopBar = () => {

    const history = useHistory()
    const [searchInput, setSearchInput] = useState('')

    const search = async () => {
        const posts = await axios.get(`/posts/search?post=${searchInput}`)
        history.push('/search-result', {
            posts: posts.data
        })
    }

    return (
        <div className="topbar">
            <div className="logo">
                <div className="logo-image"></div>
                <h3>Yikes!</h3>
            </div>
            <div className="navigation">
                <h3 className="navigation-option">About</h3>
                <div className="search-bar">
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
                    placeholder='Search something' className="search-input" type="text"/>
                    <button onClick={search} className="search-button"><FaSearch color='white'
                    size={18} /></button>
                </div>
            </div>
        </div>
    )
}

export default  TopBar