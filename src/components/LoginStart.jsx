import React from 'react'
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function LoginStart() {
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
        .then(() => {
          navigate('/');
        })
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='login__container'>
      {/* <div className='login__box' id='box'>
        <div
          className='login__button'
          id='button'
          onClick={signInWithGoogle}
        >
          <p className='login__button_text'>sign in</p>
          <p className='login__button_text'>with</p>
          <p className='login__button_text'>GOOGLE</p>
        </div>
      </div> */}

      <div className='login__box' id='box2'>
        <div
          className='login__button'
          id='button2'
          onClick={()=>{navigate('signin')}}
        >
          <p className='login__button_text'>sign in</p>
        </div>
      </div>

      <div className='login__box' id='box3'>
        <div
          className='login__button'
          id='button3'
          onClick={()=>{navigate('signup')}}
        >
          <p className='login__button_text'>sign up</p>
        </div>
      </div>
    </div>
  )
}
