import React from 'react'
import Post from '../Post'
import './styles.css'

const LastPosts = () => {
    return (
        <div className="lastposts-container">
            <h2>Last posts</h2>
            <div className="posts">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default LastPosts