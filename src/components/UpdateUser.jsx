import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { BiCamera } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';

export default function UpdateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState(auth.currentUser.displayName);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const file = e.target[1].files[0];
    if (!file) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: displayName
      }).then(() => {
        navigate(-1);
      }).catch((error) => {
        alert(error.message);
      });
    } else if (!displayName) {
      const date = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${displayName + '-avatar-' + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              photoURL: downloadURL,
            });
            navigate(-1);
          } catch (error) {
            alert(error.message);
          }
        });
      });
    } else if (file && displayName) {
      const date = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${displayName + '-avatar-' + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(auth.currentUser, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              displayName: displayName,
              photoURL: downloadURL,
            });
            navigate(-1);
          } catch (error) {
            alert(error.message);
          }
        });
      });
    }
  };

  const filePreview = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  return (
    <div className='upd'>
      <form onSubmit={handleSubmit} className='upd__form'>
      <div className="Input">
        <input id='input' className="Input-text" type="text" placeholder="display name" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <label htmlFor="input" className="Input-label">display name</label>
      </div>
        <div className='upd__form_ava'>
          <input style={{ display: "none" }} type="file" accept="image/*" id="file" onChange={filePreview}/>
          <label htmlFor="file">
            <BiCamera className='icon' />
            <p className='text'>add an avatar</p>
          </label>
          <BiX className='close' onClick={() => {setImage(null)}}/>
        </div>
        
        <button>Update user</button>
      </form>
      {image && <img className='upd__image' src={image} alt="" />}
    </div>
  )
}
