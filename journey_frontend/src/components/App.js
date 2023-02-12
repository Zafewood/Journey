import '../styles/App.css';
import { db } from '../firebase-config';
import { getDatabase, ref, set } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
  return (
    <Router >
      <NavBar />
      <div class="main-content" data-testid="test">
        <Routes>
          <Route path='/' element={ <HomePage /> }/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;