import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from '../firebase';
import User from './User';
import Loader from './Loader';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users'), where("uid", "!=", auth.currentUser.uid)), (querySnapshot) => {
      setLoading(true);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      console.log(arr);
      setUsers(arr);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  if (loading) {
    return <Loader />
  } else if (!loading) {
    return (
      <div className='users'>
        {/* <p className='users__title'>users:</p> */}
        {users.map(user => (
          <User user={user} key={user.uid}/>
        ))}
      </div>
    )
  }
}
