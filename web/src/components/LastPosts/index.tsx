import React, { useEffect, useState } from 'react'
import Post from '../Post'
import axios from 'axios'
import './styles.css'

const LastPosts = () => {

    interface IPost {
        id: number
        title: string
        urlImage: string
        path: string
    }

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        axios.get<IPost[]>('/posts/get').then(resp => {
            setPosts(resp.data)
        }).catch(err => {

        })
    }, [])

    const renderPosts = () => {
        return posts.map(post => (
            <Post {...post} />
        ))
    }

    return (
        <div className="lastposts-container">
            <h2>Last posts</h2>
            <div className="posts">
               {renderPosts()}
            </div>
        </div>
    )
}

export default LastPosts