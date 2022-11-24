import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { collection, onSnapshot, addDoc, query, where, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { db, auth } from '../firebase';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { BiX } from 'react-icons/bi';

export default function Chats() {
  const customStyles = {
    content: {
      width: '50%',
      height: '50vh',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const animatedComponents = makeAnimated();

  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrForSelect, setArrForSelect] = useState([]);
  const [usersForNewChat, setUsersForNewChat] = useState([]);
  const [chatName, setChatName] = useState(null);

  const changeUsers = (event) => {
    let arr = event;
    let nArr = arr.map(el => el.value)
    setUsersForNewChat(nArr);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users'), where("uid", "!=", auth.currentUser.uid)), (querySnapshot) => {
      let as = [];
      querySnapshot.forEach((doc) => {
        let el = {
          value: doc.data().uid,
          label: doc.data().displayName,
        };
        as.push(el)
      });
      setArrForSelect(as);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "chats"), where('users', "array-contains", auth.currentUser.uid)), (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        let el = doc.data();
        el.id = doc.id;
        arr.push(el);
      });
      setChats(arr);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  const newChat = async() => {
    let data = {
      name: chatName,
      messages: [],
      users: [...usersForNewChat, auth.currentUser.uid]
    };
    console.log(data);
    await addDoc(collection(db, 'chats'), data);
    setOpen(false);
    setChatName(null);
    setArrForSelect([]);
    setUsersForNewChat([]);
  }

  // useEffect(() => {
  //   window.addEventListener('keydown', function(event) {
  //     if (event.code === 'Escape') {
  //       setOpen(false);
  //     }
  //  })
  // }, [])
  
  return (
    <div className='chats'>
      <div className='chats__list'>
        {chats.map((chat) => (
          <Link
            className='chats__list_item'
            to={`${chat.id}`}
            key={chat.id}
          >
            {chat.name}
          </Link>
        ))}
      </div>

      <Outlet />
     
      <div className='chats__add' onClick={() => {setOpen(true)}}>
        <p className='chats__add_text'>NEW</p>
      </div>
     
      <div className={'modal ' + (open ? 'modal-open' : 'modal-close')}>
        <div className='modal__bg' onClick={() => {setOpen(false)}}></div>
        
        <div className='modal__content'>
          <BiX className='modal__content_close' onClick={() => {setOpen(false)}}/>
          <h2>add new chat</h2>

          <div className="input">
            <input id='input' className="input-text" required type="text" placeholder="chat name" onChange={(e) => {setChatName(e.target.value)}}/>
            <label htmlFor="input" className="input-label">chat name</label>
          </div>

          <Select
            components={animatedComponents}
            closeMenuOnSelect={false}
            isMulti
            options={arrForSelect}
            onChange={changeUsers}
            placeholder="add users"
          />

          <button 
            className={`button ${!chatName || !usersForNewChat.length ? 'button-disabled' : 'button-ok'}`}
            disabled={!chatName || !usersForNewChat.length}
            onClick={newChat}
          >
            add
          </button>
        </div>
      </div>
    </div>
  )
}
