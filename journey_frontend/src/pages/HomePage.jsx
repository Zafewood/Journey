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

  const handleSort = (sortBy) => {
    let sortedTrips;
    console.log("Sort by: ", sortBy);
    switch (sortBy) {
      case "Title":
        sortedTrips = [...filteredTrips].sort((a, b) =>
          a.tripTitle.localeCompare(b.tripTitle)
        );
        break;
      case "Duration":
        console.log("sort by duration");
        sortedTrips = [...filteredTrips].sort(
          (a, b) => parseInt(a.tripDuration) - parseInt(b.tripDuration)
        );
        break;
      case "Country":
        console.log("sort by country");
        sortedTrips = [...filteredTrips].sort((a, b) =>
          a.tripCountry.localeCompare(b.tripCountry)
        );
        case "Price":
        console.log("sort by country");
        sortedTrips = [...filteredTrips].sort((a, b) =>
          a.tripCountry.localeCompare(b.tripCountry)
        );
        break;
      default:
        sortedTrips = filteredTrips;
        break;
    }

    setFilteredTrips(sortedTrips);
  }

  return (
    <>
      <div className='hero-content'>
        <h1 className='hero-title'>YOUR NEXT JOURNEY AWAITS...</h1>
      </div>
      <img src={test} alt="" className='background-image' />
      
      <div className='bottom-content'>
        <h1 className='text-over-image'>NEWEST TRIPS</h1>
        <div><Searchbar handleSearch={handleSearch} handleSort={handleSort}></Searchbar></div>
        <div className='card-view'>
          <CreateTrip tripAddedHandler={tripAddedHandler}/>
          {filteredTrips.map((tripObject, index) => {
            console.log('key: ', tripObject.id);
            return <DisplayTrip tripsInfo={tripObject} key={index} handleUserEditTrip={handleUserEditTrip} signedInUser={signedInUser} tripsChanged={tripsChanged}/>
          })}
        </div>
      </div>
    </>
  )
}


export default HomePage