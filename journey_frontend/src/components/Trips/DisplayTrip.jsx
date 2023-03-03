import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';

function DisplayTrip({ tripsInfo, handleUserEditTrip }) {
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

    const editTrip = () => {
        handleUserEditTrip(tripsInfo);
    }

  return (
    <div className='test'>
        <div className='card-content'>
            <div className='card-left'>
                <img src={placeholderImg} alt="" className='trip-image' />
            </div>
            <div className='card-right'>
                <h1 className='trip-title'>{tripsInfo?.tripTitle}</h1>
                <div className='trip-info'>
                    <p className='trip-author'> Author: </p>
                    <p className='trip-duration' data-testid="trip-duration">Duration (days): {tripsInfo?.tripDuration}</p>
                    <p className='trip-country' data-testid="trip-country">Countries: {tripsInfo?.tripCountry}</p>
                    <p className='trip-cities' data-testid="trip-cities">Cities: {tripsInfo?.tripCity} </p> 
                    <p className='trip-description' data-testid="trip-description">Description: {tripsInfo?.tripDescription}</p> <br/>
                </div>
                <div className='trip-rating-view'>
                    <button id="editTrip" onClick={editTrip}>Edit</button>
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
