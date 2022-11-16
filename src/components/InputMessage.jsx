import React, { useState } from 'react';
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function InputMessage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const timestamp = Timestamp.now().toMillis();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      await addDoc(collection(db, 'messages'), {
        text: text,
        senderId: auth.currentUser.uid,
        id: auth.currentUser.displayName + timestamp,
        timestamp: serverTimestamp(),
      }).then(() => {
      }).catch((error) => {
        alert(error.message);
      });
    } else if (!text) {
      const storageRef = ref(storage, `${auth.currentUser.displayName + timestamp}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await addDoc(collection(db, 'messages'), {
              file: downloadURL,
              senderId: auth.currentUser.uid,
              id: auth.currentUser.displayName + timestamp,
              timestamp: serverTimestamp(),
            });
          } catch (error) {
            alert(error.message);
          }
        });
      });
    } else if (file && text) {
      const storageRef = ref(storage, `${auth.currentUser.displayName + timestamp}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await addDoc(collection(db, 'messages'), {
              text: text,
              file: downloadURL,
              senderId: auth.currentUser.uid,
              id: auth.currentUser.displayName + timestamp,
              timestamp: serverTimestamp(),
            });
          } catch (error) {
            alert(error.message);
          }
        });
      });
    }
    setText('');
    setFile(null);
  };

  // const filePreview = (event) => {
  //   const objectUrl = URL.createObjectURL(event.target.files[0]);
  //   setImage(objectUrl);
  //   console.log(image);
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Write message..." 
          value={text} onChange={(e) => setText(e.target.value)}
        />
        
        <label htmlFor="file">
          <input 
            style={{ display: "none" }} 
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <img src="" alt="img" /> */}
          <span>Add img</span>
        </label>

        <button disabled={!text && !file}>send</button>
      </form>
    </div>
  )
}
