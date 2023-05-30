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
  const [name, setName] = useState(auth.currentUser.displayName || '');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: name
      }).then(() => {
        navigate(-1);
      }).catch((error) => {
        alert(error.message);
      });
    } else if (!name) {
      const date = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${name + '-avatar-' + date}`);
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
    } else if (file && name) {
      const date = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${name + '-avatar-' + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: downloadURL,
            });
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              displayName: name,
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
    setFile(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  return (
    <div className='upd'>
      <form onSubmit={handleSubmit} className='upd__form'>
        <div className="input">
          <input id='input' className="input-text" type="text" placeholder="display name" value={name} onChange={(e) => {setName(e.target.value)}}/>
          <label htmlFor="input" className="input-label">display name</label>
        </div>
        <div className='upd__form_ava'>
          <input style={{ display: "none" }} type="file" accept="image/*" id="file" onChange={filePreview}/>
          <label htmlFor="file">
            <BiCamera className='icon' />
            <p className='text'>add an avatar</p>
          </label>
        </div>
        
        <button 
          className={`button ${!name? 'button-disabled' : 'button-ok'}`}
          disabled={!name}
        >
          Update user
        </button>
      </form>
      {image && 
        <div className='upd__image'>
          <img src={image} alt="" />
          <BiX className='close' onClick={() => {setImage(null)}}/>
        </div>
      }
    </div>
  )
}
