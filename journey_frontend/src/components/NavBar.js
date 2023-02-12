import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

function NavBar() {
  return (
    <nav data-testid="navbar">
        <div class="nav-left">
            <Link to='/'>JOURNEY</Link>
        </div>
        <div class="nav-mid">
            <ul>
                <li>
                    <Link to='/'>About</Link>
                </li>
                <li>
                <button class="my-journey-btn"><Link class="test" to='/about'>MY JOURNEY</Link></button>
                </li>
            </ul>
        </div>
        <div class="nav-right">

        </div>
        
    </nav>
  )
}

export default NavBar