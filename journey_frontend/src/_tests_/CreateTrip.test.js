import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TripsCard from '../components/Trips/CreateTrip'

describe('TripsCard tests', () => {
  it('should render the "Add travel" button', () => {
    render(<TripsCard />);
    const addButton = screen.getByRole('button', { name: 'Add travel' });
    expect(addButton).toBeInTheDocument();
    
  });

  it('should display form on "Add travel" button click', () => {
    render(<TripsCard />);

    const addButton = screen.getByRole('button', { name: 'Add travel' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const formTitle = screen.getByLabelText('Title of your trip');
    expect(formTitle).toBeInTheDocument();

    const formDuration = screen.getByLabelText('Duration (days)');
    expect(formDuration).toBeInTheDocument();

    const formCountry = screen.getByLabelText('Country/Countries');
    expect(formCountry).toBeInTheDocument();

    const formCity = screen.getByLabelText('City/Cities');
    expect(formCity).toBeInTheDocument();

    const formDescription = screen.getByLabelText('Description');
    expect(formDescription).toBeInTheDocument();
  });

  /*
  it('should hide the form when the "Send in form" button is clicked', () => {
    render(<TripsCard />);
    const addButton = screen.getByRole('button', { name: 'Add travel' });
    fireEvent.click(addButton);

    
    const sendInFormButton = screen.getByRole('button', { name: 'Send in form' });
    fireEvent.click(sendInFormButton);
    

    const formTitle = screen.queryByLabelText('Title of your trip');
    expect(formTitle).not.toBeInTheDocument();

    const formAuthor = screen.queryByLabelText('Author');
    expect(formAuthor).not.toBeInTheDocument();

    const formDuration = screen.queryByLabelText('Duration (days)');
    expect(formDuration).not.toBeInTheDocument();

    const formCountry = screen.queryByLabelText('Country/Countries');
    expect(formCountry).not.toBeInTheDocument();

    const formCity = screen.queryByLabelText('City/Cities');
    expect(formCity).not.toBeInTheDocument();

    const formDescription = screen.queryByLabelText('Description');
    expect(formDescription).not.toBeInTheDocument();
  });
  */
});
