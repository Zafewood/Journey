import React from 'react'
import '../../styles/Trips/EditTrip.css'
import { useState, useEffect } from 'react';

function EditTrip( {userTripEdit, shouldShowPopup}) {

  useEffect(() => {
    document.getElementById("tripTitle").value = userTripEdit.tripTitle;
    document.getElementById("durationInput").value = userTripEdit.tripDuration;
    document.getElementById("countryInput").value = userTripEdit.tripCountry;
    document.getElementById("descriptionInput").value = userTripEdit.tripDescription;
    console.log(userTripEdit.tripID);
  });
  
  const [trip, setTrip] = useState({
    tripTitle: "",
    tripDuration: "",
    tripCountry: "",
    tripCity: "",
    tripDescription: ""
  });
  
    //setTrip(userTripEdit);

    const updateTitle = (event) => {
        setTrip(prevTrip => ({ ...prevTrip, tripTitle: event.target.value }));
    };
    
    const updateDuration = (event) => {
        setTrip(prevTrip => ({ ...prevTrip, tripDuration: event.target.value }));
    };
    
    const updateCountry = (e) => {
        setTrip(prevTrip => ({ ...prevTrip, tripCountry: e.target.value }));
    };
    
    const updateCity = (e) => {
        setTrip(prevTrip => ({ ...prevTrip, tripCity: e.target.value }));
    };
    
    const updateDescription = (e) => {
        setTrip(prevTrip => ({ ...prevTrip, tripDescription: e.target.value }));
    };

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
                        <label htmlFor='countryInput'> Country/Countries </label> 
                        <input id='countryInput' type ="text" onChange={updateCountry}></input> 
                        <label htmlFor='citiesInput'> City/Cities </label> 
                        <input id='citiesInput' type ="text" onChange={updateCity}></input> 
                        <label htmlFor='descriptionInput' > Description </label> 
                        <textarea id='descriptionInput' type ="text" onChange={updateDescription} textarea rows={5} cols={40} ></textarea>
            </div>
        </div>
        
    </div>
  )
}

export default EditTrip