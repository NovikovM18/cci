import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from '../firebase';
import User from './User';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users'), where("uid", "!=", auth.currentUser.uid)), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUsers((prevUsers) => [
          ...prevUsers, doc.data()
        ]);
      });
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
