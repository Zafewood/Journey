import React from 'react'
import '../../styles/Trips/CreateTrip.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState, useEffect } from 'react'
import UserComment from './UserComment';
import { auth, db } from '../../firebase-config'

import  firebaseService  from '../../services/firebaseService';


function TripsCard({ tripAddedHandler, theme, signedInUser }) {
    const [isShown, setIsShown] = useState(false);
    const [trip, setTrip] = useState({
        tripTitle: '',
        tripDuration: '',
        tripPrice: '',     
        tripCountry: '',
        tripCity: '',
        tripKeywords: '',   
        tripDescription: '',
        tripAuthor: signedInUser ? signedInUser.email : "",
      });

    useEffect(() => {
        setTrip(prevTrip => ({ ...prevTrip, tripAuthor: signedInUser ? signedInUser.email : ""}));
    }, [signedInUser]);

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


  return (
    <div className= "tripBox" style={{display: signedInUser ? "block" : "none"}}> 
        <button  id='addTravelButton' data-testid="addTravelBtn" onClick={changeButtonText}>Add Your Own Travel</button>
        {isShown && (
            <div className={`tripform${theme}`}>
            <form>
                <h1 id='createTripHeader'> <b> Add Your Journey Here </b> </h1> 
                <div className="trip-content">
                    <label htmlFor="titleInput">Title of your trip</label>
                    <input id="titleInput" type="text" onChange={updateTitle} />
                    <label id='authorLabel'> Author: {auth.currentUser ? auth.currentUser.email : ""} </label> 
                    <label htmlFor='duationInput'> Duration (days) </label> 
                    <input id='duationInput' type="integer" onChange = {updateDuration}></input> 
                    <label htmlFor="priceInput">Estimated Price</label>
                    <input id="priceInput" type="integer" onChange={updatePrice}></input>
                    <label htmlFor='countryInput'> Country/Countries </label> 
                    <input id='countryInput' type ="text" onChange={updateCountry}></input> 
                    <label htmlFor='citiesInput'> City/Cities </label> 
                    <input id='citiesInput' type ="text" onChange={updateCity}></input> 
                    <label htmlFor='keywordsInput'> Keywords </label> 
                    <input id='keywordsInput' type ="text" onChange={updateKeywords}></input>
                    <label htmlFor='descriptionInput' > Description </label> 
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