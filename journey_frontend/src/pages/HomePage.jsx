import React from 'react'
import test from '../assets/bakgrunn.jpg'
import '../styles/HomePage.css'

function HomePage() {
  return (
    <>
      <div className='text-container'>
        <h1 className='hero-title'>YOUR NEXT JOURNEY AWAITS...</h1>
      </div>
        
        <img src={test} alt="" className='background-image' />
    </>
  )
}

export default HomePage