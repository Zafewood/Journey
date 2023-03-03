import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { BrowserRouter as Router } from 'react-router-dom'

describe('App tests', () => {

  beforeEach(() => {
    render(<App /> );
  })

  it('renders the navbar', () => {
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  it('renders the main content', () => {
    const mainContentElement = screen.getByTestId('main-content');
    expect(mainContentElement).toBeInTheDocument();
  });

  it('renders the footer', () => {
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
