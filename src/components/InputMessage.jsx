import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiCamera } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';

export default function InputMessage({ chatId }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);
  const timestamp = Timestamp.now().toMillis();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion ({
          text: text,
          senderId: auth.currentUser.uid,
          id: auth.currentUser.displayName + timestamp + Math.random().toFixed(5),
          // timestamp: serverTimestamp(),
        })
      }).then(() => {
      }).catch((error) => {
        alert(error.message);
      });
    } else if (!text) {
      const storageRef = ref(storage, `${auth.currentUser.displayName + timestamp}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion ({
                file: downloadURL,
                senderId: auth.currentUser.uid,
                id: auth.currentUser.displayName + timestamp + Math.random().toFixed(5),
                // timestamp: serverTimestamp(),
              })
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
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion ({
                text: text,
                file: downloadURL,
                senderId: auth.currentUser.uid,
                id: auth.currentUser.displayName + timestamp + Math.random().toFixed(5),
                // timestamp: serverTimestamp(),
              })
            });
          } catch (error) {
            alert(error.message);
          }
        });
      });
    }
    setText('');
    setFile(null);
    setImages(null);
  };

  const filePreview = (event) => {
    setFile(event.target.files[0])
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImages(objectUrl);
  };

  const clearFiles = () => {
    setFile(null);
    setImages(null);
  }

  return (
    <div className='inM'>
      <form onSubmit={handleSubmit} className='inM__form'>
        <div className="input">
          <input
            className="input-text"
            type="text" 
            placeholder="Write message..." 
            value={text} onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* <div className='inM__images'>
        {images.map((image, i) => (
          <img className='inM__images_item' src={image} alt="" key={i}/>
          ))}
        </div> */}
        {images && 
        <div className='inM__images_item'>
          <img src={images} alt=""/>
          <BiX className='close' onClick={clearFiles}/>
        </div>
        }
        <div className='inM__form_img'>
          <input 
            style={{ display: "none" }} 
            type="file"
            id="file"
            accept="image/*"
            onChange={filePreview}
          />
          <label htmlFor="file">
            <BiCamera className='icon' />
            {/* <p className='text'>add image</p> */}
          </label>
        </div>

        <button
          className={`button ${!text && !file ? 'button-disabled' : 'button-ok'}`}
          disabled={!text && !file}
        >
          send
        </button>
      </form>
    </div>
  )
}
