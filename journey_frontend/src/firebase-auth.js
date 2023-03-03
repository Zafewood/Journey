import { auth } from './firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './firebase-config';
import { set, ref } from 'firebase/database';

const createUserWithCredentials = (mail, password, displayName = null, homeCountry = null) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          set(ref(db, 'users/' + user.uid), {
            email: user.email,
            displayName: displayName,
            homeCountry: homeCountry,
          })
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  }

export default createUserWithCredentials;