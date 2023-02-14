import React from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
        <h1>Log In</h1><br />
        <label>Email</label><br />
        <input></input><br /><br />
        <label>Password</label><br />
        <input></input><br /><br />
        <button>LOG IN</button><br /><br /><br />
        <h4>Don´t have an account??</h4>
        <button><Link to='/createuserpage'>Create new account</Link></button>

    </>
  )
}

export default LoginPage