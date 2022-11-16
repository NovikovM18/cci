import React from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="display name" />
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          {/* <img src="" alt="img" /> */}
          <span>Add an avatar</span>
        </label>
        <button>Sign up</button>
      </form>

      <Link to='/login/signin'>Already have account? Go to sign in</Link>
    </div>
  )
}
