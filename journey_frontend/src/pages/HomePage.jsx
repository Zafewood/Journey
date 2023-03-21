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

  const findAverageRating = (ratings) => {
    if (ratings === undefined) {
      return 0;
    }
    var count = 0.0;
    var sum = 0.0;
      for (let j = 0; j < Object.values(ratings).length; j++) {
          count += 1.0;
          sum += parseInt(Object.values(ratings)[j].tripRating);
      }
    const average = (sum / count).toFixed(1);
    return average;
  }
  // Function for sorting trips by option from searchbar dropdown menu
  const sortByOption = (sortBy, inputArray) => {
    let sortedTrips;
    switch (sortBy) {
      case "Duration (low to high)":
        console.log("sort by duration");
        sortedTrips = [...inputArray].sort(
          (a, b) => parseInt(a.tripDuration) - parseInt(b.tripDuration)
        );
        break;
      case "Country":
        console.log("sort by country");
        sortedTrips = [...inputArray].sort((a, b) =>
          a.tripCountry.localeCompare(b.tripCountry)
        );
        break;
        case "Price (low to high)":
        console.log("sort by price");
        sortedTrips = [...inputArray].sort((a, b) =>
        parseInt(a.tripPrice) - parseInt(b.tripPrice)
          //a.tripCountry.localeCompare(b.tripCountry)
        );
        break;
        case "Rating":
        console.log("sort by rating");
        sortedTrips = [...inputArray].sort(
          (a, b) => (findAverageRating(b.ratings)) - (findAverageRating(a.ratings))
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
