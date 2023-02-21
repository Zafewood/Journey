import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';

function DisplayTrip() {
    const [cardHeight, setCardHeight] = useState("0px");
    const [isExpanded, setIsExpanded] = useState(false);
    const [shoudlDisplay, setShouldDisplay] = useState("none")

    const handleExpand = () => {
        if (isExpanded) {
            setCardHeight("0px");
            setShouldDisplay("none")
        } else {
            setCardHeight("auto");
            setShouldDisplay("block")
        }
        setIsExpanded(!isExpanded);
    }

  return (
    <div className='test'>
        <div className='card-content'>
            <div className='card-left'>
                <img src={placeholderImg} alt="" className='trip-image' />
            </div>
            <div className='card-right'>
                <h1 className='trip-title'>Title of your trip</h1>
                <div className='trip-info'>
                    <p className='trip-author'>Ola Halvorsen</p>
                    <p className='trip-duration'>9 days</p>
                    <p className='trip-country'>portugal</p>
                    <p className='trip-route'>Porto - Lisboa - Faro</p>
                    <p className='trip-keywords'>Hiking, nature, party, beach</p>
                </div>
                <div className='trip-rating-view'>
                    <p>Average rating:</p>
                    <h1>Star rating here</h1>
                    <button className='comments-btn' onClick={handleExpand}>12 comments</button>
                </div>
            </div>
            
        </div>
        <div className='trip-comments' style={{ 
            height: cardHeight,
            display: shoudlDisplay
            }}>
            <UserComment />
            <UserComment />
            <UserComment />
            <UserComment />
            <UserComment />
        </div>
    </div>
  )
}

export default DisplayTrip
