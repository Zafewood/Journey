import React from 'react'
import '../../styles/Trips/TripsCard.css'
import placeholderImg from '../../assets/example-beach.jpg'
import { useState } from 'react'
import UserComment from './UserComment';
import { auth } from '../../firebase-config';
import { set } from 'firebase/database';

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
        console.log(auth.currentUser.email)
        setIsShown(false);
        if (auth.currentUser.email == null) { 
            alert("A user must be logged in to add a travel")
        } else { 
            return ({title, country, city, description});   
        }
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
        <button  id='addTravelButton'onClick={handleClick}> Add travel </button>
        {isShown && (
            <div>
            <form>
                <h1> <b> Add Your Journey Here </b> </h1> <br/>
                <label> Title of your trip </label> <br/>
                <input type ="text" onChange = {updateTitle} ></input> <br/> <br/>
                <label> Author </label> <br/>
                <label> {auth.currentUser.displayName} </label> <br/> <br/>
                <label> Duration </label> <br/>
                <input type="integer" onChange = {updateDuration}></input> <br/> <br/>
                <label> Country/Countries </label> <br/>
                <input type ="text" onChange={updateCountry}></input> <br/> <br/>
                <label> City/Cities </label> <br/>
                <input type ="text" onChange={updateCity}></input> <br/> <br/>
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