import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset email sent!');
      navigate('/login/signin');
    })
    .catch((error) => {
      alert(error.message);
    });
    setEmail(null);
  };

  return (
    <div className='resP'>
      <form onSubmit={handleSubmit} className='resP__form'>
        <div className="input">
          <input id='input' className="input-text" required type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
          <label htmlFor="input" className="input-label">email</label>
        </div>
        <button 
          className={`button ${!email ? 'button-disabled' : 'button-ok'}`}
          disabled={!email}
        >
          Reset password
        </button>
      </form>
      <div className='resP__links'>
        <Link to='/login/signin' className='resP__links_item'>Back to sign in</Link>
      </div>
    </div>
  )
}
