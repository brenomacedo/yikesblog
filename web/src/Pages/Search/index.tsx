import React from 'react'
import Topbar from '../../components/Topbar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'
import './styles.css'

const Search = () => {
    return (
        <div className="search-container">
            <Topbar />
            <h2>Exibindo 12 resultados para sua pesquisa:</h2>
            <div className="results">
                <div className="post-results">
                     
                </div>
            </div>
            <Footer />
        </div>  
    )
}

export default Search