import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset email sent!');
      navigate('/login/signin');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className='resP'>
      <form onSubmit={handleSubmit} className='resP__form'>
        <div className="Input">
          <input id='input' className="Input-text" required type="email" placeholder="email" />
          <label htmlFor="input" className="Input-label">email</label>
        </div>
        <button>Reset password</button>
      </form>
      <div className='resP__links'>
        <Link to='/login/signin' className='resP__links_item'>Back to sign in</Link>
      </div>
    </div>
  )
}
