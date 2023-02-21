import '../styles/App.css';
import { db } from '../firebase-config';
import { getDatabase, ref, set } from "firebase/database";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import CreateUserPage from '../pages/CreateUserPage';
import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import  firebaseService  from '../services/firebaseService';


const About = () => <h1>About page</h1>

function App() {

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    testFunc();
  }, [])
  

  const testFunc = () => {
    firebaseService.getAllTrips().then((data) => {
      setTrips(data)
    })
  }

  const handleAuthStateChanged = (newUser) => {
    setUser(newUser);
    console.log('new user signed in: ', user);
  }

  return (
    // Whole app embedded inside router element to display different content based on current route
    // Main content of the app is rendered inside the main-content div, and the content depends on the current route
    // Only one Route element is active at a time, and will display its element value as the main content.
    <Router >
      <NavBar currentUser={user}/>
      <div className="main-content" data-testid="main-content">
        <Routes>
          <Route path='/' element={ <HomePage allTrips={trips}/> }/>
          <Route path='/about' element={ <About /> }/>
          <Route path='/loginpage' element={ <LoginPage authChanged={handleAuthStateChanged}/> }/>
          <Route path='/createuserpage' element={ <CreateUserPage /> }/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

