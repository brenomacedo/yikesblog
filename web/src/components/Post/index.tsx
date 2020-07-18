import React from 'react'
import './styles.css'
import { useHistory } from 'react-router-dom'

interface IPost {
    id: number
    urlImage: string
    path: string
    title: string
}

const Post: React.FC<IPost> = (props) => {

    const history = useHistory()

    const redirect = () => {
        history.push(`/post/${props.path}`)
    }

    return (
        <div onClick={redirect} className="post">
            <div className="post-image">

            </div>
            <div className="post-title">
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default Post