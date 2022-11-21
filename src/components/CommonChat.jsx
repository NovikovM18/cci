import React from 'react';
import Messages from './Messages';
import InputMessage from './InputMessage';

export default function CommonChat() {

  return (
    <div className='chat'>
      <div className='chat__messages'>
        <Messages />
        <InputMessage />
      </div>
    </div>
  )
}