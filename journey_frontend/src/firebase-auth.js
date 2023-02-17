import { auth } from './firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './firebase-config';
import { set, ref } from 'firebase/database';

const createUserWithCredentials = (mail, password) => {
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          email: user.email
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

export default createUserWithCredentials;