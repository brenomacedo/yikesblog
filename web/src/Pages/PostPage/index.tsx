import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'
import parser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

const PostPage = () => {

    interface IParams {
        path: string
    }

    interface IPost {
        id: number
        title: string
        content: string
        urlImage: string
        views: number
        userId: number
        path: string
        date: Date
        user: {
            id: number
            login: string
            nickname: string
        }
    }

    const params = useParams<IParams>()

    const [error, setError] = useState(false)
    const [post, setPost] = useState({
        id: 0,
        title: '',
        content: '',
        urlImage: '',
        views: 0,
        userId: 0,
        path: '',
        date: new Date()
    })

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        try {
            const postData = await axios.get(`/posts/path/get?path=${params.path}`)
            setPost(postData.data)
            console.log(postData.data)
        } catch(e) {
            setError(true)
        }
        
    }

    const renderContent = () => {
        if(error) {
            return (
                <h1 className="error">POST NOT FOUND!</h1>
            )
        } else {
            return parser(post.content)
        }
    }

    return (
        <div className="postpage-container">
            <Topbar />
            <div className="post-content">
                {renderContent()}
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