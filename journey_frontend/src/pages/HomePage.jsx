import React from 'react'
import test from '../assets/bakgrunn.svg'
import DisplayTrip from '../components/Trips/DisplayTrip'
import CreateTrip from '../components/Trips/CreateTrip'
import Searchbar from '../components/Searchbar'
import '../styles/HomePage.css'
import { useState, useEffect } from 'react'

function HomePage({ allTrips, tripAddedHandler, handleUserEditTrip, signedInUser, tripsChanged }) {

  const [initialTripsArray, setInitialTripsArray] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([])

  
  // Load initial trips
  useEffect(() => {
    const allTripsArray = Object.values(allTrips);
    setInitialTripsArray(allTripsArray);
    setFilteredTrips(allTripsArray);
  }, [allTrips]);

  const handleSearch = (searchText) => {


    const matchingTrips = initialTripsArray.filter((trip) => {
      const { tripTitle, tripCountry, tripCity } = trip;
      return (
        tripTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        tripCountry.toLowerCase().includes(searchText.toLowerCase()) ||
        tripCity.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilteredTrips(matchingTrips);
  }

  return (
    <>
      <div className='hero-content'>
        <h1 className='hero-title'>YOUR NEXT JOURNEY AWAITS...</h1>
      </div>
      <img src={test} alt="" className='background-image' />
      
      <div className='bottom-content'>
        <h1 className='text-over-image'>NEWEST TRIPS</h1>
        <div><Searchbar handleSearch={handleSearch}></Searchbar></div>
        <div className='card-view'>
          <CreateTrip tripAddedHandler={tripAddedHandler}/>
          {filteredTrips.map((tripObject, index) => {
            console.log('key: ', tripObject.id);
            return <DisplayTrip allTrips={allTrips} tripsInfo={tripObject} key={index} handleUserEditTrip={handleUserEditTrip} signedInUser={signedInUser} tripsChanged={tripsChanged}/>
          })}
        </div>
      </div>
    </>
  )
}


export default HomePage