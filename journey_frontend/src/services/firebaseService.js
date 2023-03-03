import { db, auth } from '../firebase-config';
import { set, ref, onValue, get, child } from 'firebase/database';
import { uuidv4 } from '@firebase/util';
import Cookies from 'js-cookie';


const getCurrentUserNode = () => {
    const dbRef = ref(db);
    const currentUserID = auth.currentUser.uid;
    return new Promise((resolve, reject) => {
        get(child(dbRef, `users/${currentUserID}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const userNode = snapshot.val();
            resolve(userNode);
          } else {
            resolve(null);
          }
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
      });
}

  const editUserNode = ({displayName, homeCountry, email}) => {
    
    const currentUserID = auth.currentUser.uid;
    return new Promise((resolve, reject) => {
      
      set(ref(db, 'users/' + currentUserID), {
        displayName: displayName,
        homeCountry: homeCountry,
        email: email,
      }).then(() => {
        resolve();
      }).catch((error) => {
        console.log('error editing user node: ', error);
        reject(error);
      });
    });
  }

  const getAllTrips = () => {
    const dbRef = ref(db);
    return new Promise((resolve, reject) => {
      get(child(dbRef, 'trips')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('data trips: ', data)
          
          resolve(data);
        } else {
          console.log('error');
          resolve(null);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  }

  const createTrip = ({ tripTitle, tripCountry, tripCity, tripDescription, tripDuration }) => {
    const dbRef = ref(db);
    const tripID = uuidv4();
    const userID = "1jEO8tQdc6a2l3HD62QlDl6q3aP2"
    set(ref(db, 'trips/' + tripID), {
      tripTitle, 
      tripID,
      tripCountry, 
      tripCity, 
      tripDescription,
      tripDuration
    }).then(() => {
      set(ref(db, 'users/' + userID + '/userTrips/' + tripID), {
        tripID
      })
    })
  }

export default { getCurrentUserNode, editUserNode, getAllTrips, createTrip }