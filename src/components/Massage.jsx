import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Massage({ message }) {
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users'), where("uid", "==", message.senderId)), (querySnapshot) => {
      let u = {};
      querySnapshot.forEach((doc) => {
          u = doc.data();
      });
      console.log(u);
      setSender(u);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  const timeFormating = (t) => {
    if (t) {
      let tt = t.toMillis()
      return (new Date(tt).toLocaleDateString("en-US") + ' ' + new Date(tt).toLocaleTimeString("en-US"));
    }
  }

  return (
    <div
      className={`message ${message.senderId === auth.currentUser.uid ? 'owner' : 'sender'}`}
    >
      <div className="message__info">
        {sender && 
        <div className='message__info_user'>
          <img src={sender.photoURL} alt=""/>
          <p>{sender.displayName}</p>
        </div>
        }
        <span>{timeFormating(message.timestamp)}</span>
      </div>

      <div className="message__content">
        {message.text && <p>{message.text}</p>}
        {message.file && <img src={message.file} alt="" />}
      </div>
    </div>
  )
}
