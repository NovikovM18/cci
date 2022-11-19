import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
        return;
    });
  };
  
  return (
    <div className='sIn'>
      <form onSubmit={handleSubmit} className='sIn__form'>
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <button>Sign in</button>
      </form>

      <div className='sIn__links'>
        <Link to='/login/reset' className='sIn__links_item'>Forgot password?</Link>
        <Link to='/login/signup' className='sIn__links_item'>Havn't account? Go to sign up</Link>
      </div>
    </div>
  )
}
