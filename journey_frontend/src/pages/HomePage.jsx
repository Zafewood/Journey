import React from 'react'
import test from '../assets/bakgrunn.svg'
import DisplayTrip from '../components/Trips/DisplayTrip'
import CreateTrip from '../components/Trips/CreateTrip'
import Searchbar from '../components/Searchbar'
import '../styles/HomePage.css'
import { useState, useEffect } from 'react'

function HomePage({ allTrips, tripAddedHandler, handleUserEditTrip, signedInUser, tripsChanged, theme }) {

  const allTripsArray = Object.values(allTrips);
  const [initialTripsArray, setInitialTripsArray] = useState(allTripsArray);
  const [filteredTrips, setFilteredTrips] = useState([])
  const [sortVal, setSortVal] = useState("Newest");

  // Load initial trips
  useEffect(() => {
    setInitialTripsArray(allTripsArray);
    setFilteredTrips(allTripsArray)
  }, [allTrips]);

  // Search handler is ran when search button is pressed with searchfields test as input
  const handleSearch = (searchText) => {
    console.log("searchtext: ", searchText);
    const matchingTrips = allTripsArray.filter((trip) => {
      const { tripTitle, tripCountry, tripCity } = trip;
      return (
        tripTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
        tripCountry?.toLowerCase().includes(searchText.toLowerCase()) ||
        tripCity?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    const matchingTripsSorted = sortByOption(sortVal, matchingTrips);
    setFilteredTrips(matchingTripsSorted);
  }

  // Function for sorting trips by option from searchbar dropdown menu
  const sortByOption = (sortBy, inputArray) => {
    let sortedTrips;
    switch (sortBy) {
      case "Title":
        console.log("sort by title");
        sortedTrips = [...inputArray].sort((a, b) =>
          a.tripTitle.localeCompare(b.tripTitle)
        );
        break;
      case "Duration":
        console.log("sort by duration");
        sortedTrips = [...inputArray].sort(
          (a, b) => parseInt(b.tripDuration) - parseInt(a.tripDuration)
        );
        break;
      case "Country":
        console.log("sort by country");
        sortedTrips = [...inputArray].sort((a, b) =>
          a.tripCountry.localeCompare(b.tripCountry)
        );
        break;
        case "Price":
        console.log("sort by price");
        sortedTrips = [...inputArray].sort((a, b) =>
          a.tripCountry.localeCompare(b.tripCountry)
        );
        break;
      default:
        sortedTrips = inputArray;
        break;
    }
    return sortedTrips;
  }

  // Handler for searchbar dropdown menu
  const handleSort = (sortBy) => {
    setSortVal(sortBy);
    const sortedTrips = sortByOption(sortBy, filteredTrips);
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
            return <DisplayTrip tripsInfo={tripObject} key={index} handleUserEditTrip={handleUserEditTrip} signedInUser={signedInUser} tripsChanged={tripsChanged} theme={theme}/>
          })}
        </div>
      </div>
    </>
  )
}


export default HomePage
