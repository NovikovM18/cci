import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, doc, onSnapshot, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Massage';
import { async } from '@firebase/util';

export default function Messages({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      setMessages(doc.data().messages);
      // setTimeout(() => {
      //   document.getElementById('end').scrollIntoView({ behavior: 'smooth' });
      // }, 1000)
    });
    return () => {
      unsubscribe();
    }
  }, [chatId])

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('end').scrollIntoView({ behavior: 'smooth' });
    }, 1000)
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
