import React from 'react'
import '../../styles/Trips/CreateTrip.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';

import  firebaseService  from '../../services/firebaseService';


function TripsCard({ tripAddedHandler }) {
    const [isShown, setIsShown] = useState(false);
    const [trip, setTrip] = useState({
        tripTitle: '',
        tripDuration: '',
        tripCountry: '',
        tripCity: '',
        tripDescription: ''
      });

      function changeButtonText () { 
        const button = document.getElementById("addTravelButton");
        setIsShown(current => !current);
        if (isShown == true) { 
            button.textContent = 'Add Your Own Travel'
        } else { 
            button.textContent = 'Exit';
        }

    }

    const sendInForm = () => { 
        //console.log(auth.currentUser.email)
        const button = document.getElementById("addTravelButton");
        setIsShown(false);
        if (isShown == true) { 
            button.textContent = 'Add Your Own Travel'
        } else { 
            button.textContent = 'Exit';
        }
        console.log('obj:', trip);
        firebaseService.createTrip(trip);
        tripAddedHandler();
        /*
        if (auth.currentUser.email == null) { 
            alert("A user must be logged in to add a travel")
        } else { 
            firebaseService.createTrip({title, country, city, description})
            return ({title, country, city, description});   
        }
        */
    }

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
    <div className= "tripBox"> 
        <button  id='addTravelButton' onClick={changeButtonText}> Add travel </button>
        {isShown && (
            <div>
            <form>
                <h1> <b> Add Your Journey Here </b> </h1> 
                <div className="trip-content">
                    <label for="titleInput">Title of your trip</label>
                    <input id="titleInput" type="text" onChange={updateTitle} />
                    <label id='authorLabel'> Author </label> 
                    <label for='duationInput'> Duration (days) </label> 
                    <input id='duationInput' type="integer" onChange = {updateDuration}></input> 
                    <label for='countryInput'> Country/Countries </label> 
                    <input id='countryInput' type ="text" onChange={updateCountry}></input> 
                    <label for='citiesInput'> City/Cities </label> 
                    <input id='citiesInput' type ="text" onChange={updateCity}></input> 
                    <label for='descriptionInput' > Description </label> 
                    <textarea id='descriptionInput' type ="text" onChange={updateDescription} textarea rows={5} cols={40} ></textarea> 
                </div>
            </form>
            <button id='formButton' onClick={sendInForm}>Send in form</button>
            </div>
            )}
     </div>
  )
}

export default TripsCard