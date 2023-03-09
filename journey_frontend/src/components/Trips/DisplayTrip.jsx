import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState, useEffect } from 'react'
import UserComment from './UserComment';
import firebaseService from '../../services/firebaseService';
import { Rating } from 'react-simple-star-rating'
import { auth } from '../../firebase-config';

function DisplayTrip({ tripsInfo, handleUserEditTrip, signedInUser, tripsChanged}) {
    const [cardHeight, setCardHeight] = useState("0px");
    const [isExpanded, setIsExpanded] = useState(false);
    const [shoudlDisplay, setShouldDisplay] = useState("none")
    const [likedTripButton, setLikeTripButton] = useState(true);
    const [btnText, setBtnText] = useState("Like this trip")
    const [rating, setRating] = useState(0)
    const [setOrHold, setSetOrHold] = useState(setRating)
    const [ratingtype, setRatingType] = useState('Avg rating')
    const [isHoverAllowed, setIsHoverAllowed] = useState(true)

    function loadValues(){
    {setRatingType('Avg rating')
    setRating(2.3)} //avg from database
    }

    const handleChoice = () => {
      console.log('choosing')
      setRatingType('Your rating')
      setSetOrHold(setRating)
      setIsHoverAllowed(true)

    }

    const handleRating = (index) => {
        //lagre index og tripID i useractivity på currentuser
        //lagre currentuser i RatedBy på tripID-en
          console.log('Test:' + index)
          setRatingType('Your rating')
          setRating(index)
          setSetOrHold(index)
          setIsHoverAllowed(false)
        }

    const currentUserID = signedInUser ? signedInUser.uid : null;

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
        handleUserEditTrip(tripsInfo)
    }

    const deleteTrip = () => {
        firebaseService.deleteTripNode({
            tripID: tripsInfo.tripID,
            userID: tripsInfo.userID
        }).then(() => {
            tripsChanged();
        })
    }

    useEffect(() => {
        if (typeof tripsInfo.tripLikedBy !== 'undefined') {
            const tripLikedBy = Object.values(tripsInfo.tripLikedBy);
            for (let i = 0; i < tripLikedBy.length; i++) {
                if (tripLikedBy[i].userID === currentUserID) {
                    setBtnText('Unlike this trip')
                    setLikeTripButton(false)
                    break;
                } else {
                    setBtnText('Like this trip')
                    setLikeTripButton(true)
                }
            } 
        } else {
            setBtnText('Like this trip')
            setLikeTripButton(true)
        }
      }, [tripsInfo]);

      
    const likeTrip = () => { 
        // vente på å få inn trip author --> gjøre slik at man ikke kan like egen trip
        if (auth.currentUser === null) { 
            alert('A nonlogged in person cannot like a trip')
        } else { 
            setLikeTripButton (current => !current);
            if (likedTripButton) { 
                firebaseService.addLike({
                    userID: auth.currentUser.uid,
                    tripID: tripsInfo.tripID,
                });
                tripsChanged();
            } else { 
                firebaseService.removeLike({ 
                    userID: auth.currentUser.uid,
                    tripID: tripsInfo.tripID,
                })
                tripsChanged();
            }
        }

    }

  return (
    <div className='test' onLoad={loadValues}>
        <div className='card-content'>
            <div className='card-left'>
                <img src={placeholderImg} alt="" className='trip-image' />
            </div>
            <div className='card-right'>
                <button id='likeButton' onClick={likeTrip}> {btnText} </button>
                <h1 className='trip-title'>{tripsInfo?.tripTitle}</h1>
                <div className='trip-info'>
                    <p className='trip-author'> Author: </p>
                    <p className='trip-duration' data-testid="trip-duration">Duration (days): {tripsInfo?.tripDuration}</p>
                    <p className='trip-country' data-testid="trip-country">Countries: {tripsInfo?.tripCountry}</p>
                    <p className='trip-cities' data-testid="trip-cities">Cities: {tripsInfo?.tripCity} </p> 
                    <p className='trip-description' data-testid="trip-description">Description: {tripsInfo?.tripDescription}</p> <br/>
                </div>
                <button id="editTrip" onClick={editTrip} style={{ display: currentUserID == tripsInfo.userID ? 'block' : 'none' }}>Edit</button>
                <button id="deleteTrip" onClick={deleteTrip} style={{ display: currentUserID == tripsInfo.userID ? 'block' : 'none' }}>Delete</button>
                <div className='trip-rating-view'>
                  <div className='app' >
                    <div className='rating'>
                    <Rating 
                    initialValue={rating}
                    onPointerLeave={loadValues}
                    onClick={handleRating}
                    onPointerEnter={handleChoice}
                    onPointerMove={setSetOrHold}
                    allowFraction={true}
                    transition={true}
                    allowHover={isHoverAllowed}
                    />
                    </div>
                    <div className='your-rating'>{ratingtype}: {rating}</div> 
                  </div>
                  
                </div>
                <button className='comments-btn' onClick={handleExpand}>12 comments</button>
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
