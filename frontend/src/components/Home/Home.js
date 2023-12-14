import React from 'react'
import bg from '../../img/home-bg.jpg'
import './home-module.css'

function Home() {
  return (
    <div className='home-container text-center'>
        <img className='home-bg' src={bg}/>
    </div>
  )
}

export default Home