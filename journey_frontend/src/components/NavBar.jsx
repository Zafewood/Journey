import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'
import logo from '../assets/journey_brown_monochromatic.png'


function NavBar({ currentUser }) {
  return (
    <nav data-testid="navbar">
        <div className="nav-left">
            
            {/* Link elements work kind of like html a tag, but they also set the route for react router. 
                Pressing a link changes current route, which rerenders app component with correct content.            
            */}
            <Link to='/'><img src={logo} alt="" className='logo' /></Link>
        </div>
        <div className="nav-mid">
            <ul>
                <li>
                    <Link to='/'>TOP TRAVELS</Link>
                </li>
                <li>
                    <Link to='/'>FAVOURITES</Link>
                </li>
                <li>
                <button className="my-journey-btn">
                    <Link className="test" to={currentUser ? '/profile' : '/loginpage'}>
                        {currentUser ? currentUser.email : 'Logg inn'}
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
    </nav>
  )
}

export default NavBar