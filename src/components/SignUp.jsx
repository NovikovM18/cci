import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { BiCamera } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';

export default function SignUp() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const date = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${displayName + '-avatar-' + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(response.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', response.user.uid), {
              uid: response.user.uid,
              email: email,
              displayName: displayName,
              photoURL: downloadURL,
            });
            navigate('/');
          } catch (error) {
            alert(error.message);
          }
        });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const filePreview = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  return (
    <div className='sUp'>
      <form onSubmit={handleSubmit} className='sUp__form'>
        <input required type="text" placeholder="display name" />
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <div className='sUp__form_ava'>
          <input required style={{ display: "none" }} type="file" accept="image/*" id="file" onChange={filePreview}/>
          <label htmlFor="file">
            <BiCamera className='icon' />
            <p className='text'>add an avatar</p>
          </label>
          <BiX className='close' onClick={() => {setImage(null)}}/>
        </div>
        <button type='submit'>Sign up</button>
      </form>

      <div className='sUp__links'>
        <Link to='/login/signin' className='sUp__links_item'>Already have account? Go to sign in</Link>
      </div>

      {image && <img className='sUp__image' src={image} alt="" />}
    </div>
  )
}
