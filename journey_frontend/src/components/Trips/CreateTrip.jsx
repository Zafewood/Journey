import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';
import { auth } from '../../firebase-config';
import { set } from 'firebase/database';
import  firebaseService  from '../../services/firebaseService';
import { useEffect } from 'react';

function TripsCard({ tripAddedHandler }) {
    const [isShown, setIsShown] = useState(false);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
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
                <h1> <b> Add Your Journey Here </b> </h1> <br/>
                <label> Title of your trip </label> <br/>
                <input type ="text" onChange = {updateTitle} ></input> <br/> <br/>
                <label> Author </label> <br/>
                <label> {auth.currentUser.email} </label> <br/> <br/>
                <label> Duration (days) </label> <br/>
                <input type="integer" onChange = {updateDuration}></input> <br/> <br/>
                <label> Country/Countries </label> <br/>
                <input type ="text" onChange={updateCountry}></input> <br/> <br/>
                <label> City/Cities </label> <br/>
                <input type ="text" onChange={updateCity}></input> <br/> <br/>
                <label> Description </label> <br/>
                <textarea type ="text" onChange={updateDescription} textarea rows={5} cols={40} ></textarea> <br/> <br/>
            </form>
            <button id='formButton' onClick={sendInForm}> Send in form </button>
            </div>
            )}
     </div>
  )
}

export default TripsCard