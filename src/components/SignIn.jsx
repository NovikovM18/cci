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
        <div className="Input">
          <input id='input' className="Input-text" required type="email" placeholder="email" />
          <label htmlFor="input" className="Input-label">email</label>
        </div>
        <div className="Input">
          <input id='input2' className="Input-text" required type="password" placeholder="password" />
          <label htmlFor="input2" className="Input-label">password</label>
        </div>
        <button>Sign in</button>
      </form>

      <div className='sIn__links'>
        <Link to='/login/reset' className='sIn__links_item'>Forgot password?</Link>
        <Link to='/login/signup' className='sIn__links_item'>Havn't account? Go to sign up</Link>
      </div>
    </div>
  )
}
