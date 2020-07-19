import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import Footer from '../../components/Footer'
import LastPosts from '../../components/LastPosts'
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
        date: string
        user: {
            id: number
            login: string
            nickname: string
        }
    }

    const params = useParams<IParams>()

    const [error, setError] = useState(false)
    const [post, setPost] = useState<IPost>({
        id: 0,
        title: '',
        content: '',
        urlImage: '',
        views: 0,
        userId: 0,
        path: '',
        date: '',
        user: {
            login: '',
            nickname: '',
            id: 0
        }
    })

    
    const getPost = async () => {
        try {
            const postData = await axios.get<IPost>(`/posts/path/get?path=${params.path}`)
            setPost(postData.data)
        } catch(e) {
            setError(true)
        }
        
    }
    
    useEffect(() => {
        getPost()
    }, [])

    const renderContent = () => {
        if(error) {
            return (
                <h1 className="error">POST NOT FOUND!</h1>
            )
        } else {
            return parser(post.content)
        }
    }

    const genDate = (date: string) => {
        const separated = date.split('T')
        return `${separated[0]}`
    }

    return (
        <div className="postpage-container">
            <Topbar />
            <div className="post-content">
                {renderContent()}
                {!error ? (<div className="post-info-user">
                                <br/>
                                <h2>Posted by: {post.user.nickname} at {genDate(post.date)}</h2>
                            </div>) : false}
                 
            </div>
            <div className="other-posts">
                <LastPosts />
            </div>
            <Footer />
        </div>
    )
}

export default PostPage