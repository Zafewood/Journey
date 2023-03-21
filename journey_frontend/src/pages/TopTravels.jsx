import '../styles/TopTravels.css';
import DisplayTrip from "../components/Trips/DisplayTrip";
import { useState } from 'react';
import { useEffect } from 'react';

function TopTravels ({allTrips, signedInUser, tripsChanged, handleUserEditTrip}) { 

    const allTripsArray = Object.values(allTrips);
    const [topTravels, setTopTravels] = useState([]);

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

     useEffect(() => { 
        let sortedTrips;
        console.log("sort by rating");
        sortedTrips = [...allTripsArray].sort(
          (a, b) => (findAverageRating(b.ratings)) - (findAverageRating(a.ratings))
        );
        setTopTravels(sortedTrips);
        },[allTrips])

     const updateAmount = ((e) => { 
            setAmount(e.target.value);
     })

     const [amount, setAmount] = useState(5);
    
    return (
        <> 
        <h1 id='topTravelsHeader'> OUR TOP TRAVELS RIGHT NOW </h1> 
        
        <div className='TopTravelTrip'> 
        <select className="tripsDropdown" name="filter" id="filter" value={amount} onChange={updateAmount}>
                <option value="5">5 trips</option>
                <option value="10">10 trips</option>
            </select>
            {topTravels.slice(0,amount).map((tripObject, index) => {
                return <DisplayTrip key={index} tripsInfo={tripObject} signedInUser={signedInUser} tripsChanged={tripsChanged} handleUserEditTrip={handleUserEditTrip}/>
          })}
        </div>
        </>
        
    )

}
export default TopTravels;