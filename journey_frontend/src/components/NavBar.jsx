import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'


function NavBar() {
  return (
    <nav data-testid="navbar">
        <div className="nav-left">
            {/* Link elements work kind of like html a tag, but they also set the route for react router. 
                Pressing a link changes current route, which rerenders app component with correct content.            
            */}
            <Link to='/'>JOURNEY</Link>
        </div>
        <div class="nav-mid">
            <ul>
                <li>
                    <Link to='/'>Lorem</Link>
                </li>
                <li>
                    <Link to='/'>Ipsum</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                <button className="my-journey-btn"><Link class="test" to='/about'>MY JOURNEY</Link></button>
                </li>
            </ul>
        </div>
        <div className="nav-right">
            <p>Profile pic/</p>
            <p>create user</p>
        </div>
        
    </nav>
  )
}

export default NavBar