import React from 'react'
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import '../../styles/Trips/CreateComment.css'


function CreateComment({signedInUser, tripsInfo, tripsChanged}) {
    const [comment, setComment] = useState("");

    const saveComment = () => {
        firebaseService.saveComment({
            comment: comment,
            userID: signedInUser.uid,
            tripID: tripsInfo.tripID
        }).then(() => {
            tripsChanged();
          })
    }

    const updateComment = (event) => {
        setComment(event.target.value);
      };

    return (
        <div className='create-comment-content' style={{display: signedInUser ? "block" : "none"}}>
            <div className='create-comment-right'>
                <h3 id="create-comment-header">Create Comment</h3>
                <textarea id="commentInput" type="text" onChange={updateComment}></textarea>
                <button id="comment-button" onClick={saveComment}>Save Comment</button>
            </div>
        </div>
    )
}

export default CreateComment