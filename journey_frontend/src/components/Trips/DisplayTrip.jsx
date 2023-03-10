import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';
import firebaseService from '../../services/firebaseService';
import { Rating } from 'react-simple-star-rating'
import {db, auth} from '../../firebase-config';

function DisplayTrip({ allTrips, tripsInfo, handleUserEditTrip, signedInUser, tripsChanged, getAllTrips }) {
  const [cardHeight, setCardHeight] = useState("0px");
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState("none")
  const [rating, setRating] = useState(0)
  const [textRating, setTextRating] = useState(0)
  const [rateToSave, setRateToSave] = useState(0)
  const [ratingtype, setRatingType] = useState('Avg rating')
  const currentUserID = signedInUser ? signedInUser.uid : null;

  const loadAverageRating = () => {
    console.log('tripsinfocheck:', tripsInfo)
    if (tripsInfo.ratings === undefined) {
      console.log('no ratings yet')
      setRating(0);
      return;
    }
    const ratings = tripsInfo.ratings
    var count = 0.0;
    var sum = 0.0;
    console.log('ratings: ', Object.values(ratings));
      for (let j = 0; j < Object.values(ratings).length; j++) {
          count += 1.0;
          sum += Object.values(ratings)[j].tripRating;
          console.log('ratingcheck: ', Object.values(ratings)[j].tripRating);
      }
    const average = (sum / count).toFixed(1);
    setTextRating(average);
    setRating(average);
    setRatingType('Avg rating')
  };

  const handleRating = (rate) => {
    setRating(rate);
    setTextRating(rate);
    setRateToSave(rate);

  };

  const saveRating = () => {
    console.log('rate that till be saved:' + rateToSave)
    firebaseService.saveRating({
      tripID: tripsInfo.tripID,
      userID: auth.currentUser.uid,
      tripRating: rateToSave
    }).then(() => {
      console.log('rating updated succesfully');
      console.log('tripchange');
      tripsChanged();
      loadAverageRating();
    }).catch((error) => {
      console.log('error occured: ', error);
    })
  };

  const handlePointerMove = (rate) => {
    setRatingType('Your rating');
    setTextRating(rating)
    setRating(rate)
  };

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

  return (
    <div className='test' onLoad={loadAverageRating}>
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
          <button id="editTrip" onClick={editTrip} style={{ display: currentUserID === tripsInfo.userID ? 'block' : 'none' }}>Edit</button>
          <button id="deleteTrip" onClick={deleteTrip} style={{ display: currentUserID === tripsInfo.userID ? 'block' : 'none' }}>Delete</button>
          <div className='trip-rating-view'>
            <div className='app' >
              <div id='rating'>
                <Rating 
                allowFraction={true}
                readonly={currentUserID == null ? true : false}
                onClick={handleRating}
                onPointerMove={handlePointerMove}
                //onPointerLeave={loadAverageRating} if user stop hovering should bring back average
                initialValue={textRating}
                allowHover={rating === 0 ? true : false}
                />
              </div>
              <button className='rating-btn' onClick={saveRating} style={{ display: currentUserID ? 'inline' : 'none' }}> Send rating</button>  
            <div className='your-rating'>{ratingtype}: {textRating}</div>   
            </div>  
          </div>
        <button className='comments-btn' onClick={handleExpand}>12 comments</button>
        </div>   
      </div>
      <div className='trip-comments' style={{ 
        height: cardHeight,
        display: shouldDisplay
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
