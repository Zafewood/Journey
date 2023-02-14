import React from 'react'
import { Link } from 'react-router-dom';

function CreateUserPage() {
  return (
    <>
        <h1>Create User</h1><br />
        <label>Enter Email</label><br />
        <input></input><br /><br />
        <label>Choose Password</label><br />
        <input></input><br /><br />
        <button>CREATE USER</button><br /><br /><br />
        <h4>Already have a user?</h4>
        <button><Link to='/loginpage'>Log in here</Link></button>

    </>
  )
}

export default CreateUserPage