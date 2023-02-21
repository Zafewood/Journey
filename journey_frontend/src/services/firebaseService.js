import { db, auth } from '../firebase-config';
import { set, ref, onValue, get, child } from 'firebase/database';
import { uuidv4 } from '@firebase/util';


const getCurrentUserNode = () => {
    const dbRef = ref(db);
    const currentUserID = auth.currentUser.uid;
    return new Promise((resolve, reject) => {
        get(child(dbRef, `users/${currentUserID}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('user exists');
            const userNode = snapshot.val();
            resolve(userNode);
          } else {
            console.log("No data available");
            resolve(null);
          }
        }).catch((error) => {
          console.error(error);
          reject(error);
        });
      });
}

const writeTripToUserNode = ({tripName, tripAuthor, tripDuration }) => {
    const currentUserID = auth.currentUser.uid;
    const tripID = uuidv4();
    set(ref(db, 'users/' + currentUserID + '/trips/' + tripID), {
      tripName,  
      tripAuthor,
      tripDuration
    }).then(() => {
      set(ref(db, 'tips/' + tripID), {
        tripName,
        tripAuthor,
        tripDuration
      })
    }).catch((error) => (
      console.log('error: ', error)
    ))
  }

  const editUserNode = ({displayname, homeCountry}) => {
    const currentUserID = auth.currentUser.uid;
    set(ref(db, 'users/' + currentUserID), {
      displayname: displayname, 
      homeCountry: homeCountry
    }).catch((error) => (
      console.log('error: ', error)
    ))
  }

export default { getCurrentUserNode, writeTripToUserNode, editUserNode }