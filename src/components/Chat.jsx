import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Messages from './Messages';
import InputMessage from './InputMessage';

export default function Chat() {
  let params = useParams();

  return (
    <div className='chat'>
      <div className='chat__messages'>
        <Messages chatId={params.id}/>
        <InputMessage chatId={params.id}/>
      </div>
    </div>
  )
}
