import '../styles/App.css';
import { db, auth } from '../firebase-config';
import { getDatabase, ref, set } from "firebase/database";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import CreateUserPage from '../pages/CreateUserPage';
import Favourites from '../pages/Favourites';
import Profile from '../pages/Profile';
import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect, createContext } from 'react';
import  firebaseService  from '../services/firebaseService';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import EditTrip from './Trips/EditTrip';
import ReactSwitch from "react-switch";
import Searchbar from './Searchbar';
import DisplayTrip from './Trips/DisplayTrip';
import UserComment from './Trips/UserComment';
import TripsCard from './Trips/CreateTrip';
import '../styles/darkMode.css';
import '../styles/NavBar.css';

export const ThemeContext = createContext(null);





const About = () => <h1>About page</h1>

function App() {

// Making function for toggeling between light and dark mode
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [userTripEdit, setUserTripEdit] = useState({});
  const [shouldShowPopup, setPopup] = useState(false);

  // Handler for when child component updates current user
  const handleAuthStateChanged = (newUser) => {
    setUser(newUser);
    console.log('new user signed in: ', user);
  }

  // Retrieve all trips from database
  const getAllTrips = () => {
    firebaseService.getAllTrips().then((retrievedTrips) => {
      
      setTrips(retrievedTrips)
    })
  }

  // Handler function for when child component ads a new trip
  const newTripAdded = () => {
    getAllTrips();
  }

  const tripsChanged = () => {
    getAllTrips();
  }

  // Auth persistence: check if user is signed in from before or not
  const checkIfUserIsSignedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user signed in: ', user);
        setUser(user);
      } else {
        console.log('User not signed in', user);
        // console.log('this is user id: ', auth.currentUser.uid, 'hva kommer ut');
      }
    })
  }

  const signOutUSers = () => {
    signOut(auth).then(() => {
      console.log('signed out sucessfull');
      setUser(null)
    }).catch((error) => {
      console.log('error signing out; ', error);
    })
  }

  const handleUserEditTrip = (tripsInfo) => {
    setUserTripEdit(tripsInfo);
    setPopup(!shouldShowPopup);
  }

  const handleUserSaveTrip = () => {
    setPopup(!shouldShowPopup);
  }

  // Useffect hook
  useEffect(() => {
    checkIfUserIsSignedIn();
    getAllTrips();
    newTripAdded();
  }, [])
  
  return (
    // Whole app embedded inside router element to display different content based on current route
    // Main content of the app is rendered inside the main-content div, and the content depends on the current route
    // Only one Route element is active at a time, and will display its element value as the main content.
    <> 
      <EditTrip userTripEdit={userTripEdit} shouldShowPopup={shouldShowPopup} handleUserSaveTrip={handleUserSaveTrip} tripsChanged={tripsChanged}/>
      <Router >
        <NavBar currentUser={user} toggleTheme={toggleTheme} theme={theme}/>
        
        <div className={`main-content ${theme}`} data-testid="main-content">
          <Routes>
            
            <Route path='/' element={ <HomePage allTrips={trips} tripAddedHandler={newTripAdded} handleUserEditTrip={handleUserEditTrip} signedInUser={user} tripsChanged={tripsChanged}theme={theme}/> }/>
            <Route path='/favourites' element={ <Favourites allTrips={trips} signedInUser={user} tripsChanged={tripsChanged} handleUserEditTrip={handleUserEditTrip} /> }/>
            <Route path='/loginpage' element={ <LoginPage authChanged={handleAuthStateChanged}/> }/>
            <Route path='/createuserpage' element={ <CreateUserPage /> }/>
            <Route path='/profile' element={ <Profile allTrips={trips} currentUser={user} signOutHandler={signOutUSers} /> }/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
    
  );
}

export default App;

