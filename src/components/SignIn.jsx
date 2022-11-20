import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Loader from './Loader';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        return;
    });
    setEmail(null);
    setPassword(null);
  };

  // useEffect(() => {
  //   console.log(email);
  //   console.log(password);
  // }, [email, password]);

  if (loading) {
    return <Loader />
  } else if (!loading) {
    return (
      <div className='sIn'>
        <form onSubmit={handleSubmit} className='sIn__form'>
          <div className="input">
            <input id='input' className="input-text" required type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="input" className="input-label">email</label>
          </div>
          <div className="input">
            <input id='input2' className="input-text" required type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <label htmlFor="input2" className="input-label">password</label>
          </div>
          <button 
            className={`button ${!email || !password ? 'button-disabled' : 'button-ok'}`}
            disabled={!email || !password}
          >
            Sign in
          </button>
        </form>

        <div className='sIn__links'>
          <Link to='/login/reset' className='sIn__links_item'>Forgot password?</Link>
          <Link to='/login/signup' className='sIn__links_item'>Havn't account? Go to sign up</Link>
        </div>
      </div>
    )
  }
}
