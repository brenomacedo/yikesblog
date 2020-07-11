import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import './styles.css'

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="admin-bar">
                <div className="admin-info">
                    <div className="admin-image"></div>
                    <h3>admin</h3>
                </div>
                <div className="logout">
                    <h3>LogOut</h3>
                    <FiLogOut color='white' size={20} />
                </div>
            </div>
            <h2>Welcome, admin!</h2>
            <div className="panel">
                <div className="panel-options">
                    <div className="option view-posts">View Posts</div>
                    <div className="option create-post">Create Post</div>
                    <div className="option update-post">Update Post</div>
                </div>
                <div className="selected-option">
                    
                </div>
            </div>
        </div>
    )
}

export default Profile