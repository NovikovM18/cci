import React from 'react'

export default function User({user}) {

  return (
    <div className='user'>
      <div className='user__info'>
        <img className='user__info_img' src={user.photoURL} alt="" />
        <p className='user__info_name'>
          {user.displayName}
        </p>
      </div>

      <div className='user__actions'>
        <div className='user__actions_item'>
          <p>add todo</p>
        </div>

        <div className='user__actions_item'>
          <p>open chat with</p>
        </div>
      </div>

    </div>
  )
}
