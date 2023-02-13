import { render, screen, cleanup } from '@testing-library/react';
import App from '../components/App';
import { Footer } from '../components/Footer';

test('Navbar should render', () => {
    render(<App />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
})