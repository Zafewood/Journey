import { Link } from 'react-router-dom';
import { auth } from '../firebase-config'
import createUserWithCredentials from '../firebase-auth';
import { React, useState } from 'react';
import { forceLongPolling } from 'firebase/database';


function CreateUserPage() {
  // email and password state variables update with each keypress
  // in respective input fields 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const updatePassword = (event) => {
    setPassword(event.target.value)
  }

  const createUser = () => {
    createUserWithCredentials(email, password)
    console.log('mail: ', email);
    console.log('pass: ', password);
  }

  return (
    <>
        <h1>Create User</h1><br />
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

