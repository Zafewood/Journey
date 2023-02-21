import { Link, useNavigate } from 'react-router-dom';
import createUserWithCredentials from '../firebase-auth';
import { React, useState } from 'react';


function CreateUserPage() {
  // email, password, username and home country state variables update with each keypress
  // in respective input fields 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [homeCountry, setHomeCountry] = useState("");

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const updatePassword = (event) => {
    setPassword(event.target.value)
  }

  const updateUsername = (event) => { 
    setUsername(event.target.value);
  }
  
  const updateHomeCountry = (event) => { 
    setHomeCountry(event.target.value);
  }

  const navigate = useNavigate();
  
  const createUser = () => {
    const result = createUserWithCredentials(email, password, username, homeCountry)
    result.then((data) => {
      if (data) {
        navigate('/loginpage');
      }
    });
  }

  return (
    <>
        <h1>Create User</h1><br />
        <label> Username </label> <br/>
        <input onChange={updateUsername} ></input> <br/> <br/>
        <label> Home Country </label> <br/>
        <input onChange={updateHomeCountry} ></input> <br/> <br/>
        <label>Enter Email</label><br />
        <input onChange={updateEmail}></input><br /><br />
        <label>Choose Password</label><br />
        <input onChange={updatePassword}></input><br /><br />
        <button onClick={createUser}>CREATE USER</button><br /><br /><br />
        <h4>Already have a user?</h4>
        <button><Link to='/loginpage' >Log in here</Link></button>
    </>
  )
}

export default CreateUserPage
