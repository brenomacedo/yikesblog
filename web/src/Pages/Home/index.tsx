import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'
import TopBar from '../../components/Topbar'
import LastPosts from '../../components/LastPosts'
import Footer from '../../components/Footer'
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios'
import './styles.css'
import { useHistory } from 'react-router-dom'

const Home = () => {

    interface IItem {
        id: number
        path: string
        views: number
        urlImage: string
        title: string
    }

    const [list, setList] = useState<IItem[]>([])
    const history = useHistory()
    useEffect(() => {
        axios.get<IItem[]>("/views/get").then(resp => {
            setList(resp.data)
        }).catch(err => {

        })
    }, [])

    const properties =  {
        duration: 3000,
        transitionDuration: 300,
        infinite: true,
        indicators: true,
        arrows: false,
        pauseOnHover: true
    }

    const redirect = (path: string) => {
        history.push(`/post/${path}`)
    }

    const renderSlides = () => {
        return list.map((item, index) => (
            <div onClick={() => redirect(item.path)} className='each-slide'>
                <div className="slide-image" style={{
                    backgroundImage: `url('http://localhost:3003/${item.urlImage}')`
                }}></div>
                <h2 className="slide-title">{item.title}</h2>
            </div>
        ))
    }

    return (
        <div className="home-container">
            <div className="presentation">
                <div className="presentation-header">
                    <TopBar />
                    <div className="presentation-content">
                        <h2>
                            Welcome to Yikes Blog! Improve your blue flame and learn the best javascript stack!
                            Here you can find posts about: Typescript, React and more!
                        </h2>
                        <div className="presentation-content-image"></div>
                    </div>
                </div>
                <svg className="svg-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1" d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,144C1120,117,1280,107,1360,101.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>
            <div className="slider-wrapper">
                <h2>Most visited</h2>
                <div className="slider">
                    <Slide {...properties}>
                        {renderSlides()}
                    </Slide>
                </div>
            </div>
            <LastPosts />
            <Footer />
        </div>
    )
}

export default Home