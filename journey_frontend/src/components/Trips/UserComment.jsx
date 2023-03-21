import React from 'react'
import defaultUser from '../../assets/default_user.jpeg'
import { useState, useEffect } from 'react'
import firebaseService from '../../services/firebaseService'
import '../../styles/Trips/UserComment.css'

function UserComment({comment, signedInUser, userID, tripID, tripsChanged}) {

  const [newComment, setComment] = useState(comment);
  const [shouldDisplaySave, setShouldDisplaySave] = useState(false);
  const [makeTextEditable, setMakeTextEditable] = useState(true);
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    setComment(comment)
    const userNode = firebaseService.getCurrentUserNode(userID);
    userNode.then(data => {
      const displayName = data.displayName;
      setDisplayName(displayName);
    })  
  }, [comment]);

  const updateComment = (event) => {
    setComment(event.target.value );
  };

  const makeCommentEditable = () => {
    setMakeTextEditable(false);
    setShouldDisplaySave(true);  
  }

  const saveComment = () => {
    setMakeTextEditable(true);
    setShouldDisplaySave(false);

    firebaseService.editComment({
      userID: userID,
      comment: newComment,
      tripID: tripID
    }).then(() => {
      tripsChanged();
    });
  }

  const deleteComment = () => {
    firebaseService.deleteComment({
      userID: userID,
      tripID: tripID
    }).then(() => {
      tripsChanged();
    });
  }

  return (
    <div className='comment-content'>
        <div className='comment-left'>
            <img src={defaultUser} alt="" className='default-user-img'/>
        </div>
        <div className='comment-right'>
            <p>{displayName}</p>
            <textarea id='comment-edit' rows={5} readOnly={makeTextEditable == true ? true : false} onChange={updateComment} value={newComment}></textarea>
            <button onClick={makeCommentEditable} style={{display: signedInUser?.uid == userID  ? 'inline' : 'none'}}>Edit</button>
            <button style={{display: shouldDisplaySave == true ? "inline" : "none"}} onClick={saveComment}>Save</button>
            <button onClick={deleteComment} style={{display: signedInUser?.uid == userID || signedInUser?.uid == "C9bhZbFCB8WkqyWf85EHWI3KymA3" ? 'inline' : 'none'}}>Delete</button>
        </div>
    </div>
  )
}

export default UserComment