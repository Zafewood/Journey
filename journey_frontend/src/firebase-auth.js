import { auth } from './firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";

const createUserWithCredentials = (mail, password) => {
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

export default createUserWithCredentials;