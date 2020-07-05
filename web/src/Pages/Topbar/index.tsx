import React from 'react'
import { FaSearch } from 'react-icons/fa'
import './styles.css'

const TopBar = () => {
    return (
        <div className="topbar">
            <div className="logo">
                <div className="logo-image"></div>
                <h3>Yikes!</h3>
            </div>
            <div className="navigation">
                <h3>About</h3>
                <div className="search-bar">
                    <input placeholder='Search something' className="search-input" type="text"/>
                    <button className="search-button"><FaSearch color='white' size={18} /></button>
                </div>
            </div>
        </div>
    )
}

export default  TopBar