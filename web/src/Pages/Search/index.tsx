import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'
import { useLocation, useHistory } from 'react-router-dom'
import './styles.css'

const Search = () => {

    interface IPost {
        id: number
        title: string
        views: number
        content: string
        urlImage: string
        userId: number
        date: string
        path: string
    }

    interface ILocation {
        posts: IPost[]
    }

    const history = useHistory()
    const location = useLocation<ILocation>()
    const [results, setResults] = useState<IPost[]>([])

    useEffect(() => {
        if(!location.state) {
            history.push('/')
            return
        }

        setResults(location.state.posts)
    }, [location.state, history])

    return (
        <div className="search-container">
            <Topbar />
            <h2>Showing {results.length} results to your search</h2>
            <div className="results">
                <div className="post-results">
                     {results.map(item => (
                         <Post id={item.id} title={item.title} path={item.path}
                         urlImage={item.urlImage} key={item.id} />
                     ))}
                </div>
            </div>
            <Footer />
        </div>  
    )
}

export default Search