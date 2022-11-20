import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { BiCamera } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import Loader from './Loader';

export default function SignUp() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
            setLoading(false);
            navigate('/');
          } catch (error) {
            setLoading(false);
            alert(error.message);
          }
        });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const filePreview = (event) => {
    setFile(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
  };

  const clearFiles = () => {
    setFile(null);
    setImage(null);
  }

  if (loading) {
    return <Loader />
  } else if (!loading) {
    return (
      <div className='sUp'>
        <form onSubmit={handleSubmit} className='sUp__form'>
          <div className="input">
            <input id='input' className="input-text" required type="text" placeholder="display name" onChange={(e) => {setDisplayName(e.target.value)}}/>
            <label htmlFor="input" className="input-label">display name</label>
          </div>
          <div className="input">
            <input id='input1' className="input-text" required type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="input1" className="input-label">email</label>
          </div>
          <div className="input">
            <input id='input2' className="input-text" required type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <label htmlFor="input2" className="input-label">password</label>
          </div>
          <div className='sUp__form_ava'>
            <input required style={{ display: "none" }} type="file" accept="image/*" id="file" onChange={filePreview}/>
            <label htmlFor="file">
              <BiCamera className='icon' />
              <p className='text'>add an avatar</p>
            </label>
            <BiX className='close' onClick={clearFiles}/>
          </div>
          <button 
            className={`button ${!displayName || !email || !password || !file? 'button-disabled' : 'button-ok'}`}
            disabled={!displayName || !email || !password || !file}
          >
            Sign up
          </button>
        </form>

        <div className='sUp__links'>
          <Link to='/login/signin' className='sUp__links_item'>Already have account? Go to sign in</Link>
        </div>

        {image && <img className='sUp__image' src={image} alt="" />}
      </div>
    )
  }
}
