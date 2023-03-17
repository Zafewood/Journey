import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'
import '../styles/darkMode.css';
import logo from '../assets/journey_brown_monochromatic.png'
import firebaseService from '../services/firebaseService';
import { useState, useEffect } from 'react';
import ReactSwitch from 'react-switch';


function NavBar({ currentUser, theme, toggleTheme }) {

    // useEffect(() => {
    //     document.body.className = theme;
    // }, [theme]);
    

    
  return (
    <nav >
        <div className="nav-left">
            
            {/* Link elements work kind of like html a tag, but they also set the route for react router. 
                Pressing a link changes current route, which rerenders app component with correct content.            
            */}
            <Link to='/'><img src={logo} alt="Journey logo" className='logo' /></Link>
        </div>
        <div className="nav-mid">
            <ul >
                <li>
                    <Link to='/' ><span className={`nav-mid ${theme} `}> TOP TRAVELS</span></Link>
                </li>
                <li>
                    <Link to='/favourites'><span className={`nav-mid ${theme} `}>FAVOURITES</span></Link>
                </li>
                <li>
                <button className="my-journey-btn">
                    <Link className="test" to={currentUser ? '/profile' : '/loginpage'}>
                        {currentUser ? currentUser.email : 'Log in'}
                    </Link></button>
                </li>
                
            </ul>
        </div>
        {/*}
        <div className="nav-right">
            <p>Profile pic/</p>
            <p>create user</p>
        </div>
        */}
        <div className={`switch ${theme}`}>
            {/*<button onClick={toggleTheme}>Toggle Theme</button>*/}
            {theme === "light" ? "Light Mode" : "Dark Mode"}
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
    </div>
    </nav>
  )
}

export default NavBar