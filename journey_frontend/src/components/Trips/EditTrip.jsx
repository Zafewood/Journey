import React from 'react'
import '../../styles/Trips/EditTrip.css'
import { useState, useEffect } from 'react';
import firebaseService from '../../services/firebaseService.js';

function EditTrip( {userTripEdit, shouldShowPopup, handleUserSaveTrip, tripsChanged}) {

  const [trip, setTrip] = useState({
    tripTitle: '',
    tripDuration: '',
    tripPrice: '',
    tripCountry: '',
    tripCity: '',
    tripKeywords: '',
    tripDescription: ''
  });

  const updateTitle = (event) => {
    setTrip(prevTrip => ({ ...prevTrip, tripTitle: event.target.value }));
  };
  
  const updateDuration = (event) => {
    setTrip(prevTrip => ({ ...prevTrip, tripDuration: event.target.value }));
  };

  const updatePrice = (e) => {
    setTrip(prevTrip => ({ ...prevTrip, tripPrice: e.target.value }));
  };
  
  const updateCountry = (e) => {
    setTrip(prevTrip => ({ ...prevTrip, tripCountry: e.target.value }));
  };
  
  const updateCity = (e) => {
    setTrip(prevTrip => ({ ...prevTrip, tripCity: e.target.value }));
  };

  const updateKeywords = (e) => {
    setTrip(prevTrip => ({ ...prevTrip, tripKeywords: e.target.value }));
  };
  
  const updateDescription = (e) => {
    setTrip(prevTrip => ({ ...prevTrip, tripDescription: e.target.value }));
  };

  const saveTripInfo = () => {
    handleUserSaveTrip();
    firebaseService.editTripNode({
      tripID: userTripEdit.tripID, 
      userID: userTripEdit.userID,
      tripTitle: trip.tripTitle, 
      tripDuration: trip.tripDuration, 
      tripPrice: trip.tripPrice,
      tripCountry: trip.tripCountry, 
      tripCity: trip.tripCity, 
      tripKeywords: trip.tripKeywords,
      tripDescription: trip.tripDescription,
    }).then(() => {
      console.log('trip node updated succesfully');
      tripsChanged();
    }).catch((error) => {
      console.log('error occured: ', error);
    })
  }

  useEffect(() => {
    const newTrip = {
      tripTitle: userTripEdit.tripTitle,
      tripDuration: userTripEdit.tripDuration,
      tripPrice: userTripEdit.tripPrice,
      tripCountry: userTripEdit.tripCountry,
      tripCity: userTripEdit.tripCity,
      tripKeywords: userTripEdit.tripKeywords,
      tripDescription: userTripEdit.tripDescription,
    };
    setTrip(newTrip);
    document.getElementById("tripTitle").value = newTrip.tripTitle;
    document.getElementById("durationInput").value = newTrip.tripDuration;
    document.getElementById("priceInput").value = newTrip.tripPrice;
    document.getElementById("countryInput").value = newTrip.tripCountry;
    document.getElementById("citiesInput").value = newTrip.tripCity;
    document.getElementById("keywordsInput").value = newTrip.tripKeywords;
    document.getElementById("descriptionInput").value = newTrip.tripDescription;
  }, [userTripEdit]);

  return (
    <div className="popup-container" 
        id='popup-container' 
        style={{ display: shouldShowPopup ? "block" : "none" }} >
        <div className='inner-popup-container'>
            <h1>Edit your trip</h1>
            <div className="popup-content">
                        <label htmlFor="titleInput">Title of your trip</label>
                        <input id="tripTitle" type="text" onChange = {updateTitle}></input>
                        <label htmlFor='durationInput'> Duration (days) </label> 
                        <input id='durationInput' type="integer" onChange = {updateDuration}></input>
                        <label htmlFor='priceInput'> Estimated Price (NOK) </label> 
                        <input id='priceInput' type="integer" onChange = {updatePrice}></input> 
                        <label htmlFor='countryInput'> Country/Countries </label> 
                        <input id='countryInput' type ="text" onChange={updateCountry}></input> 
                        <label htmlFor='citiesInput'> City/Cities </label> 
                        <input id='citiesInput' type ="text" onChange={updateCity}></input> 
                        <label htmlFor='keywordsInput'> Keywords </label> 
                        <input id='keywordsInput' type ="text" onChange={updateKeywords}></input> 
                        <label htmlFor='descriptionInput' > Description </label> 
                        <textarea id='descriptionInput' type ="text" onChange={updateDescription} textarea rows={5} cols={40} ></textarea><br/>
                        
            </div>
            <button onClick={saveTripInfo}>Save</button>
        </div>
        
    </div>
  )
}

export default EditTrip