import React from 'react'

export default function User({user}) {

  return (
    <div className='user'>
      <img className='user__img' src={user.photoURL} alt="" />
      <p className='user__name'>
        {user.displayName}
      </p>
    </div>
  )
}
