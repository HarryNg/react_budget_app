import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <h2><Link to="/budget-app">Budget App</Link></h2>
    </div>
  )
}

export default Home
