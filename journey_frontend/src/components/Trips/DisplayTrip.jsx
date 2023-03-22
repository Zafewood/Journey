import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg';
import heartEmpty from '../../assets/heart-empty.svg';
import heartFull from '../../assets/heart-fill.svg';
import trashEmpty from '../../assets/trash-empty.svg';
import trashFull from '../../assets/trash-fill.svg';
import edit from '../../assets/edit.svg';
import { useState, useEffect } from 'react';
import UserComment from './UserComment';
import CreateComment from './CreateComment';
import firebaseService from '../../services/firebaseService';
import { Rating } from 'react-simple-star-rating'
import {db, auth} from '../../firebase-config';

function DisplayTrip({tripsInfo, handleUserEditTrip, signedInUser, tripsChanged, theme}) {
  const [cardHeight, setCardHeight] = useState("0px");
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState("none");
  const [likedTripButton, setLikeTripButton] = useState(true);
  const [btnText, setBtnText] = useState("Like this trip");
  const [rating, setRating] = useState(0);
  const [ratingtype, setRatingType] = useState('Average rating');
  const currentUserID = signedInUser ? signedInUser.uid : null;
  const [rateActive, setRateActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (tripsInfo.ratings === undefined) {
      setRating(0);
      return;
    }
    const ratings = tripsInfo.ratings
    var count = 0.0;
    var sum = 0.0;
      for (let j = 0; j < Object.values(ratings).length; j++) {
          count += 1.0;
          sum += parseInt(Object.values(ratings)[j].tripRating);
      }
    const average = (sum / count).toFixed(1);
    setRating(average);
    setRatingType('Average rating')
  }, [tripsInfo]);

  const saveRating = () => {
    setRateActive(true);
    console.log("rateToSave ", rating)
    firebaseService.saveRating({
      tripID: tripsInfo.tripID,
      userID: auth.currentUser.uid,
      tripRating: rating
    }).then(() => {
      console.log('rating updated succesfully');
      tripsChanged();
    }).catch((error) => {
      console.log('error occured: ', error);
    })
  };

  const handlePointerMove = (rate) => {
    setRateActive(false);
    setRatingType('Your rating');
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
    if(window.confirm("Are you sure you want to delete this trip?") == true) {
    firebaseService.deleteTripNode({
      tripID: tripsInfo.tripID,
      userID: tripsInfo.userID
    }).then(() => {
      tripsChanged();
    })
  }}

    useEffect(() => {
        if (typeof tripsInfo.tripLikedBy !== 'undefined') {
            const tripLikedBy = Object.values(tripsInfo.tripLikedBy);
            for (let i = 0; i < tripLikedBy.length; i++) {
                if (tripLikedBy[i].userID === currentUserID) {
                    setLikeTripButton(false)
                    break;
                } else {
                    setLikeTripButton(true)
                }
            } 
        } else {
            setLikeTripButton(true)
        }
      }, [tripsInfo]);

      
    const likeTrip = () => { 
      setLikeTripButton (current => !current);
      if (likedTripButton) { 
          firebaseService.addLike({
              userID: auth.currentUser.uid,
              tripID: tripsInfo.tripID,
          });
          tripsChanged();
          console.log('liked')
      } else { 
          firebaseService.removeLike({ 
              userID: auth.currentUser.uid,
              tripID: tripsInfo.tripID,
          })
          tripsChanged();
          console.log('unliked')

      }
    }

  return (
    <div className='test'>
      <div className={`card-content ${theme}`}>
        <div className='card-left'>
            <img src={placeholderImg} alt="" className='trip-image' />
        </div>
        <div className='card-right'>
        <div className='buttonRow'>
        <button onClick={likeTrip} id='likeButton' style={{ display: currentUserID != null ? 'block' : 'none' }}> <img width={'40px'} height={'40px'} src={likedTripButton ? heartEmpty : heartFull} alt='Like'></img>  </button>
        <button onClick={editTrip} id='editTripButton' style={{ display: currentUserID === tripsInfo.userID ? 'block' : 'none' }}><img id='editTrip' width={'40px'} height={'40px'} src={edit} alt='Like'></img></button>
        <button onClick={deleteTrip} id='deleteTripButton' style={{ display: currentUserID === tripsInfo.userID || currentUserID == "C9bhZbFCB8WkqyWf85EHWI3KymA3" ? 'block' : 'none' }}><img id='deleteTrip' src={trashEmpty}></img></button>
        </div>
          <h1 className='trip-title'>{tripsInfo?.tripTitle}</h1>
          <div className='trip-info'>
          <p className='trip-author' data-testid="trip-author">Author: {tripsInfo?.tripAuthor}</p>
              <p className='trip-duration' data-testid="trip-duration">Duration (days): {tripsInfo?.tripDuration}</p>
              <p className='trip-price' data-testid="trip-price">Estimated Price (NOK): {tripsInfo?.tripPrice}</p>
              <p className='trip-country' data-testid="trip-country">Countries: {tripsInfo?.tripCountry}</p>
              <p className='trip-cities' data-testid="trip-cities">Cities: {tripsInfo?.tripCity} </p> 
              <p className='trip-keywords' data-testid="trip-keywords">Keywords: {tripsInfo?.tripKeywords} </p> 
              <p className='trip-description' data-testid="trip-description">Description: {tripsInfo?.tripDescription}</p> <br/>
          </div>
          <div className='trip-rating-view'>
            <div className='app' >
              <div id='rating'>
                <Rating 
                allowFraction={true}
                readonly={currentUserID == null ? true : false}
                onPointerMove={handlePointerMove}
                initialValue={rating}
                allowHover={rating === 0 ? true : false}
                />
              </div>
              <button id={rateActive? 'rating-btn-locked' : 'rating-btn'} onClick={saveRating} disabled={rateActive? true : false} style={{ display: currentUserID ? 'inline' : 'none', backgroundColor: rateActive ? 'gray' :'#624b2d'}}> Send rating</button>  
            <div className='your-rating'>{ratingtype}: {rating}</div>   
            </div>  
          </div>
        <button className='comments-btn' onClick={handleExpand}>{shouldDisplay == "block" ? "Hide comments" : "View comments"}</button>
        </div>   
      </div>
      <div className={`trip-comments ${theme}`} style={{ 
        height: cardHeight,
        display: shouldDisplay
        }}>
        <CreateComment signedInUser={signedInUser} tripsInfo={tripsInfo} tripsChanged={tripsChanged}/>
        <p id='no-comment' style={{display: tripsInfo.comments ? "none" : "block"}}>No Comments</p>
        {tripsInfo.comments && Object.values(tripsInfo.comments).map((comment, index) => (
        <UserComment comment={comment.comment} key={index} signedInUser={signedInUser} userID={Object.keys(tripsInfo.comments)[index]} tripsChanged={tripsChanged} tripID={tripsInfo.tripID}/>
        ))}
      </div>
    </div>
  )
}

export default DisplayTrip
