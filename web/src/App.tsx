import React from 'react'
import Routes from './routes'
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = "http://localhost:3003"

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
