import React from 'react';
import { render, screen, fireEvent, findByRole } from '@testing-library/react';
import TripsCard from '../components/Trips/CreateTrip';
import { auth } from '../firebase-config';
import  firebaseService  from '../services/firebaseService';


describe('TripsCard tests', () => {
// it('should render the "Add Your Own Travel" button when user is logged in', () => {
// render(<TripsCard/>);
// if (firebaseService.signedInUser == true){
// const addButton = screen.findByRole('button', { name: 'Add Your Own Travel', hidden: true  });
// expect(addButton).toBeInTheDocument();
// fireEvent.click(addButton);
// }
// });

it('should not render the "Add Your Own Travel" button when user is not logged in', () => {
render(<TripsCard />);
const addButton = screen.queryByRole('button', { name: 'Add Your Own Travel' });
expect(addButton).not.toBeInTheDocument();
});

// it('should display form on "Add travel" button click', () => {
// render(<TripsCard />);

// const addButton = screen.getByRole('button', { name: 'Add Your Own Travel' });
// expect(addButton).toBeInTheDocument();
// fireEvent.click(addButton);

// const formTitle = screen.getByLabelText('Title of your trip');
// expect(formTitle).toBeInTheDocument();

// const formDuration = screen.getByLabelText('Duration (days)');
// expect(formDuration).toBeInTheDocument();

// const formCountry = screen.getByLabelText('Country/Countries');
// expect(formCountry).toBeInTheDocument();

// const formCity = screen.getByLabelText('City/Cities');
// expect(formCity).toBeInTheDocument();

// const formDescription = screen.getByLabelText('Description');
// expect(formDescription).toBeInTheDocument();

// });
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


  /* OLD VERSION OF TEST******
  describe('TripsCard tests', () => {
  it('should render the "Add Your Own Travel" button', () => {
    render(<TripsCard />);
    const addButton = screen.getByRole('button', { name: 'Add Your Own Travel' });
    expect(addButton).toBeInTheDocument();
    
  });

  it('should display form on "Add travel" button click', () => {
    render(<TripsCard />);

    const addButton = screen.getByRole('button', { name: 'Add Your Own Travel' });
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
});
*/