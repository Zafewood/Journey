import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DisplayTrip from "../components/Trips/DisplayTrip";
import { auth } from '../firebase-config';
import '../styles/Favourites.css';
import firebaseService from '../services/firebaseService.js';

function Favourites({allTrips, signedInUser, tripsChanged, handleUserEditTrip}) {

    const [allTripsArray, setAllTripsArray] = useState([])
    
    const userid = auth.currentUser ? auth.currentUser.uid : null;
    useEffect(() => {
        const allTripsArray = Object.values(allTrips);
      
        const filteredTrips = allTripsArray.filter((trip) => {
          if (typeof trip.tripLikedBy !== 'undefined') {
            
            const tripLikedBy = Object.values(trip.tripLikedBy);
            for (let i = 0; i < tripLikedBy.length; i++) {
                if (tripLikedBy[i].userID === userid) {
                    return true;
                }
            } 

            return false
          } else {
            return false;
          }
        });

        console.log(filteredTrips)
      
        setAllTripsArray(filteredTrips);
      }, [allTrips]);
      
    
return (
    <div id="favouritesDiv">
      {userid ? <h1 id='headerFav'> MY FAVOURITE TRIPS </h1> : <h1 className='signin-placeholder'>Sign in to view liked trips</h1>}
        
        <div className='favouritesTrip'> 
            {allTripsArray.map((tripObject, index) => {
                return <DisplayTrip key={index} tripsInfo={tripObject} signedInUser={signedInUser} tripsChanged={tripsChanged} handleUserEditTrip={handleUserEditTrip}/>
          })}
        </div>
        
    </div>
)}

export default Favourites;