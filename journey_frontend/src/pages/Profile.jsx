import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Profile.css';
import User_picture from '../assets/default_user.jpeg'; 

function Profile({currentUser}) {
  
  const handleEditButton = () => {
    const usernameinput = document.getElementById('username');
    const homecountryinput = document.getElementById('home_country');
    usernameinput.disabled = false;
    usernameinput.style.borderWidth = '1px'
    homecountryinput.disabled = false;
    homecountryinput.style.borderWidth = '1px'
    console.log(currentUser.uid);
  };

  const handleSaveButton = () => {
    const usernameinput = document.getElementById('username');
    const homecountryinput = document.getElementById('home_country');
    usernameinput.disabled = true;
    usernameinput.style.borderWidth = '0px'
    homecountryinput.disabled = true;
    homecountryinput.style.borderWidth = '0px'
  };

  return(
    <>
    <h1 id='header'>Your Profile</h1>
    <div id='image'>
      <img src={User_picture} alt="User_picture" width='300' height='300'/>
    </div>
    <div id='personal_info'>
      <button onClick={handleEditButton}>Edit</button>
      <button onClick={handleSaveButton}>Save</button>
      <p>Username:  <input id='username' type='text' disabled value='< >'></input></p><br/>
      <p>Home Country:  <input id='home_country' type='text' disabled value='< >'></input></p><br/>
      <p>Email:  <input id='email' type='text' style={{borderWidth:'0px'}} disabled></input></p><br/>
    </div>
    <div>
      <h2>My Trips</h2>
    </div>
    </>
    )
}

export default Profile