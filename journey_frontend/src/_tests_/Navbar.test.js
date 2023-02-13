import { render, screen, cleanup } from '@testing-library/react';
import App from '../components/App';
import { Navbar } from '../components/NavBar';

test('Navbar should render', () => {
    render(<App />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
})