import React from 'react';
import Users from './Users';
import Messages from './Messages';
import InputMessage from './InputMessage';

export default function Chat() {

  return (
    <div className='chat'>
      <Users />
      <div className='chat__messages'>
        <Messages />
        <InputMessage />
      </div>
    </div>
  )
}
