import React from 'react'
import './Hero.css'
import hero_image from '../Assets/hero image.jpeg'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            </div>
        </div>
        <div className="hero-right">
            {/* <img src={hero_image} alt="" /> */}
        </div>
    </div>
  )
}
