import { render, fireEvent, screen } from '@testing-library/react';

import DisplayTrip from '../components/Trips/DisplayTrip'

describe('DisplayTrip component', () => {
  test('should render component with fields', () => {
    const tripsInfo = {
      tripTitle: 'Example trip',
      tripDuration: '7',
      tripCountry: 'Country',
      tripCity: 'City',
      tripDescription: 'Example description'
    };
    render(<DisplayTrip tripsInfo={tripsInfo} />);

    const tripDuration = screen.getByTestId('trip-duration');
    expect(tripDuration).toBeInTheDocument();

    const tripCountry = screen.getByTestId('trip-country');
    expect(tripCountry).toBeInTheDocument();

    const tripCities = screen.getByTestId('trip-cities');
    expect(tripCities).toBeInTheDocument();

    const tripDescription = screen.getByTestId('trip-description');
    expect(tripDescription).toBeInTheDocument();

    
  });
});
