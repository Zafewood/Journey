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

const writeTripToUserNode = (tripObject) => {
    const currentUserID = "4JD1Q9EUC3cpkGHwOfzubm3BhZr1"//auth.currentUser.uid;
    set(ref(db, 'users/' + currentUserID + '/trips/' + uuidv4()), {
        tripObject
    });
  }



export default { getCurrentUserNode, writeTripToUserNode }