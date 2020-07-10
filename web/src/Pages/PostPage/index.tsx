import React from 'react'
import Topbar from '../../components/Topbar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'

import './styles.css'

const PostPage = () => {
    return (
        <div className="postpage-container">
            <Topbar />
            <div className="post-content">

            </div>
            <div className="other-posts">
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <Footer />
        </div>
    )
}

export default PostPage