import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, doc, onSnapshot, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Massage';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'asc')), (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
          arr.push(doc.data());
      });
      setMessages(arr);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('end')) {
        document.getElementById('end').scrollIntoView({ behavior: 'smooth' });
      }
    }, '200')
  }, [messages.length]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      <div id="end"></div>
    </div>
  )
}
