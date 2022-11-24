import React from 'react'
import { db, auth } from '../firebase';
import { collection, query, addDoc, getDocs, getDoc, doc, where } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom';

export default function User({ user }) {
  let navigate = useNavigate();

  const openChat = () => {
    let c1 = auth.currentUser.uid + '-&-' + user.uid;
    let c2 = user.uid + '-&-' + auth.currentUser.uid;

    (async() => {
      const q = query(collection(db, "chats"), where('users', "array-contains", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        // navigate(`/dashboard/chats/${doc.id}`);
      });
      
          // (async() => {
          //   const docRef = await addDoc(collection(db, 'chats'), {
          //     name: 'CTEATE NEEEEW',
          //     code: c1,
          //     messages: []
          //   });
          //   console.log(docRef.id);
          //   navigate(`/dashboard/chats/${docRef.id}`);
          // })();
      
    })();

    
  }

  return (
    <div className='user'>
      <div className='user__info'>
        <img className='user__info_img' src={user.photoURL} alt="" />
        <p className='user__info_name'>
          {user.displayName}
        </p>
      </div>

      <div className='user__actions'>
        <div className='user__actions_item'>
          <p>add todo</p>
        </div>

        <div className='user__actions_item' onClick={openChat}>
          <p>open chat with</p>
        </div>
      </div>

    </div>
  )
}
