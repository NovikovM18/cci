import React from 'react'
import { useParams } from "react-router-dom";
import Messages from './Messages';
import InputMessage from './InputMessage';

export default function Chat() {
  let params = useParams();

  return (
    <div className='chat'>
      {params.id}
      <div className='chat__messages'>
        <Messages />
        <InputMessage />
      </div>
    </div>
  )
}
