import React, { useState } from 'react'
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default function UpdateUser() {
  const navigate = useNavigate();
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
        navigate('/');
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
            navigate('/');
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
            navigate('/');
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
    console.log(image);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="display name" />
        <input style={{ display: "none" }} type="file" accept="image/*" id="file" onChange={filePreview}/>
        <label htmlFor="file">
          {/* <img src="" alt="img" /> */}
          <span>Add an avatar</span>
        </label>
        <button>Update user</button>
      </form>
      {image && <img className='image' src={image} alt="" />}
    </div>
  )
}
