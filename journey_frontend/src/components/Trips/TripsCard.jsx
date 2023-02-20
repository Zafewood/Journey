import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';
import { auth } from '../../firebase-config';

function TripsCard() {
    const [isShown, setIsShown] = useState(false);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');


    const handleClick = event => {
        setIsShown(current => !current);

      };

    const sendInForm = () => { 
        // if (auth.currentUser == null) { 
        //     alert("A person who is not logged in cannot add trips")
        // }
        console.log("tittel: " + title);
        console.log("duration: " + duration);
        console.log("country: " + country);
        console.log("city: " + city);
        console.log("description: " + description);
        alert("hva skjer her til nå")
        setIsShown(false);
    }

    const updateTitle = (event) => { 
        setTitle(event.target.value);
    }

    const updateDuration = (event) => { 
        setDuration(event.target.value);
    }

    const updateCountry = (e) => { 
        setCountry(e.target.value);
    }

    const updateCity = (e) => { 
        setCity(e.target.value);
    }

    const updateDescription = (e) => { 
        setDescription(e.target.value);
    }


  return (
    <div className= "tripBox"> 
        <button onClick={handleClick}> Add travel </button>
        {isShown && (
            <div>
            <form>
                <h1> Add Your Journey Here</h1> <br/>
                <label> Title of your trip </label> <br/>
                <input type ="text" onChange = {updateTitle} ></input> <br/>
                <label> Author </label> <br/>
                <label> Your name </label> <br/>
                <label> Duration </label> <br/>
                <input type="integer" onChange = {updateDuration}></input> <br/>
                <label> Country/Countries </label> <br/>
                <input type ="text" onChange={updateCountry}></input> <br/>
                <label> City/Cities </label> <br/>
                <input type ="text" onChange={updateCity}></input> <br/>
                <label> Description </label> <br/>
                <textarea type ="text" onChange={updateDescription}></textarea> <br/> <br/>
            </form>
            <button onClick={sendInForm}> Send in form </button>
            </div>
            )}
     </div>
  )
}

export default TripsCard