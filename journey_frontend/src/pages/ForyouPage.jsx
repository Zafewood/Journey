import React from 'react'
import { useState, useEffect } from 'react'
import firebaseService from '../services/firebaseService';
import { auth, db } from '../firebase-config'
import DisplayTrip from '../components/Trips/DisplayTrip';
import '../styles/PersonalPage.css'


function PersonalPage({ allTrips, currentUser, tripsChanged, handleUserEditTrip }) {

    const [tripsToShow, setTripsToShow] = useState([]);
    const [allTripsUser, setAllTrips] = useState([]);

    const alltripsArray = Object.values(allTrips);

    useEffect(() => {
        getPersonalizedTrips();
    }, [allTrips])
    

    const userID = auth.currentUser ? auth.currentUser.uid : null;

    const getPersonalizedTrips = () => {
        firebaseService.getCurrentUserNode(userID).then((userNode) => {
            const currentUserLikedTripsID = userNode ? Object.keys(userNode.likedTrips ?? {}) : null;
            console.log("current liked: ", currentUserLikedTripsID);
            const likedTrips = alltripsArray.filter(someTrip => currentUserLikedTripsID.includes(someTrip.tripID))
            const keywords = likedTrips.map(someTrip => someTrip.tripKeywords)
            const separated = keywords.flatMap((keywords) => keywords.split(', ').map(keyword => keyword.trim()));

            console.log("Separated: ", separated);

            const keywordCounts = separated.reduce((acc, keyword) => {
                acc[keyword] = (acc[keyword] || 0) + 1;
                return acc;
              }, {});
              
              const sortedKeywords = Object.entries(keywordCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([keyword]) => keyword);
            
            console.log("Sorted: ", sortedKeywords);

            const maxTrips = 3;
            const matchedTrips = [];

            for (const keyword of sortedKeywords) {
                if (matchedTrips.length >= maxTrips || "") {
                  break;
                }
              
                for (const trip of alltripsArray) {
                    if (currentUserLikedTripsID.includes(trip.tripID)) {
                        continue;
                    }
                  const tripKeywords = trip.tripKeywords.split(', ').map(keyword => keyword.trim());
              
                  if (tripKeywords.includes(keyword) && !matchedTrips.some(matchedTrip => matchedTrip.tripID === trip.tripID)) {
                    matchedTrips.push(trip);
              
                    if (matchedTrips.length >= maxTrips) {
                      break;
                    }
                  }
                }
            }
            console.log("Matched trips: ", matchedTrips);
            setTripsToShow(matchedTrips);
        })
    }

  return (
    <div className='personalpage-container'>
        <div className='kom-igang'>
          {userID ? <h1 classname='kom-igang'> YOUR RECOMMENDED TRIPS </h1> : <h1 classname='signin-placeholderForyou'>Sign in to view your recommended trips</h1>}

        </div>
        <div className='foryouDiv'>
        {tripsToShow.map((tripObject, index) => {
            return (
                <DisplayTrip
                    key={index}
                    tripsInfo={tripObject}
                    signedInUser={currentUser}
                    tripsChanged={tripsChanged} 
                    handleUserEditTrip={handleUserEditTrip}
                />
            );
        })}
        </div>
    </div>
  )
}

export default PersonalPage