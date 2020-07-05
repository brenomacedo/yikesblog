import React from 'react'
import TopBar from '../Topbar'
import './styles.css'

const Home = () => {
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
        </div>
    )
}

export default Home