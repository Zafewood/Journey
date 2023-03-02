import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer tests', () => {
    
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the Journey trademark', () => {
    const trademarkElement = screen.getByText('©2023 Journey ™');
    expect(trademarkElement).toBeInTheDocument();
  });
});
