import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { db, auth } from '../firebase';

export default function Chats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async() => {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      console.log(arr);
      setChats(arr);
    })();
  }, [])

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(query(collection(db, 'chats'), where("uid", "!=", auth.currentUser.uid)), (querySnapshot) => {
  //     // setLoading(true);
  //     let arr = [];
  //     querySnapshot.forEach((doc) => {
  //       arr.push(doc.data());
  //     });
  //     setChats(arr);
  //     // setLoading(false);
  //   });
  //   return () => {
  //     unsubscribe();
  //   }
  // }, [])
  

  return (
    <div>Chats
      <div>
        {chats.map((chat) => (
          <Link
            to={`${chat.id}`}
            key={chat.id}
          >
            {chat.name}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
