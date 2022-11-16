import React from 'react'
import { auth, db } from '../firebase';

import { signOut } from "firebase/auth";

export default function LogOut() {

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div
      className='logOut'
      onClick={logOut}
    >
      <p className='logOut__text'>Log</p>
      <p className='logOut__text'>Out</p>
    </div>
  )
}
