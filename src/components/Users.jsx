import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from '../firebase';
import User from './User';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users'), where("uid", "!=", auth.currentUser.uid)), (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
          arr.push(doc.data());
      });
      setUsers(arr);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <div className='users'>
      <p className='users__title'>users:</p>
      {users.map(user => (
        <User user={user} key={user.uid}/>
      ))}
    </div>
  )
}
