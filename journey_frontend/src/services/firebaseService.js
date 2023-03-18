import { db, auth } from '../firebase-config';
import { set, ref, onValue, get, child, update } from 'firebase/database';
import { uuidv4 } from '@firebase/util';

const getCurrentUserNode = (userId) => {
  const dbRef = ref(db);
  return new Promise((resolve, reject) => {
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
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
    update(ref(db, 'users/' + currentUserID), {
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

const editTripNode = ({tripID, tripTitle, tripDuration, tripPrice, tripCountry, tripCity, tripKeywords, tripDescription}) => {
  return new Promise((resolve, reject) => {
    update(ref(db, 'trips/' + tripID), {
      tripTitle, 
      tripPrice,
      tripCountry, 
      tripCity, 
      tripKeywords,
      tripDescription,
      tripDuration
    }).then(() => {
      resolve();
    }).catch((error) => {
      console.log('error editing trip node: ', error);
      reject(error);
    });
  });
}


const deleteTripNode = ({tripID, userID}) => {
  return new Promise((resolve, reject) => {
    set(ref(db, 'trips/' + tripID), {
    }).then(() => {
      set(ref(db, 'users/' + userID + '/userTrips/' + tripID), {
      })
      resolve();
    }).catch((error) => {
      console.log('error deleting user node: ', error);
      reject(error);
    });
  });
}

const saveRating = ({ tripID, userID, tripRating }) => {
  return new Promise((resolve, reject) => {
    set(ref(db, `trips/${tripID}/ratings/${userID}/`), {
      tripRating: tripRating
    }).then(() => {
      set(ref(db, `users/${userID}/userRatedTrips/${tripID}`), {
        tripID
      })
      resolve()
    }).catch((error) => {
      console.log('error saving rating: ', error);
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

const createTrip = ({ tripTitle, tripPrice, tripCountry, tripCity, tripKeywords, tripDescription, tripDuration, tripAuthor }) => {
  const tripID = uuidv4();
  const userID = auth.currentUser.uid;
  set(ref(db, 'trips/' + tripID), {
    tripTitle, 
    tripID,
    tripPrice,
    tripCountry, 
    tripCity, 
    tripKeywords,
    tripDescription,
    tripDuration,
    userID,
    tripAuthor,
  }).then(() => {
    set(ref(db, 'users/' + userID + '/userTrips/' + tripID), {
      tripID
    })
  })
}

  const addLike = ({userID, tripID}) => { 
    set(ref(db, 'trips/' + tripID + '/tripLikedBy/' + userID), { 
      userID
    }).then(() => {
      set(ref(db, 'users/' + userID + '/likedTrips/' + tripID), {
        tripID
      })
    })
  }

  const removeLike = ({userID, tripID}) => { 
    set(ref(db, 'trips/' + tripID + '/tripLikedBy/' + userID), { 
    }).then(() => {
      set(ref(db, 'users/' + userID + '/likedTrips/' + tripID), {
      })
    })
  }

  const getCurrentUserTrips = () => {
    getCurrentUserNode().then((userNode) => {
      const userTrips = Object.keys(userNode.userTrips);
      
    })
  }
  
  const saveComment = ({ tripID, userID, comment }) => {
    return new Promise((resolve, reject) => {
      set(ref(db, `trips/${tripID}/comments/${userID}/`), {
        comment
      }).then(() => {
        set(ref(db, `users/${userID}/userCommentedTrips/${tripID}`), {
          tripID
        })
        resolve()
      }).catch((error) => {
        console.log('error saving comment: ', error);
        reject(error);
      });
    });
  }

  const editComment = ({ tripID, userID, comment }) => {
    return new Promise((resolve, reject) => {
      update(ref(db, `trips/${tripID}/comments/${userID}/`), {
        comment
      }).then(() => {
        resolve()
      }).catch((error) => {
        console.log('error saving comment: ', error);
        reject(error);
      });
    });
  }

  const deleteComment = ({ tripID, userID}) => {
    return new Promise((resolve, reject) => {
      set(ref(db, `trips/${tripID}/comments/${userID}/`), {
      }).then(() => {
        set(ref(db, `users/${userID}/userCommentedTrips/${tripID}`), {
        })
        resolve()
      }).catch((error) => {
        console.log('error saving comment: ', error);
        reject(error);
      });
    });
  }


export default { getCurrentUserNode, editUserNode, getAllTrips, createTrip, addLike, removeLike, saveRating, editTripNode, deleteTripNode, saveComment, editComment, deleteComment, getCurrentUserTrips}