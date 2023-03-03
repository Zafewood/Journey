import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom'
import { beforeAuthStateChanged } from 'firebase/auth';

describe('Navbar tests', () => {

    const currentUser = { email: 'user@example.com' };

    beforeEach(() => {
        render(<Router><NavBar currentUser={currentUser} /></Router>);
    });

  it('renders the logo image', () => {
    const logoElement = screen.getByAltText('Journey logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the top travels link', () => {
    const topTravelsLinkElement = screen.getByText('TOP TRAVELS');
    expect(topTravelsLinkElement).toBeInTheDocument();
  });

  it('renders the favourites link', () => {
    const favouritesLinkElement = screen.getByText('FAVOURITES');
    expect(favouritesLinkElement).toBeInTheDocument();
  });

  it('renders the login button with user email', () => {
    const loginButtonElement = screen.getByRole('button', { name: currentUser.email });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it('renders the user email when logged in', () => {
    const userEmailElement = screen.getByText(currentUser.email);
    expect(userEmailElement).toBeInTheDocument();
  });
});
