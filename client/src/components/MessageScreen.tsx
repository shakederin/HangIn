import React, { useContext, useEffect, useRef, useState } from 'react'
import { context } from '../App'
import socket from "../utils/socket"
import Message from './Message'

export default function MessageScreen() {
  const [messages, setMessages] = useState<Types.message[]>([])
  const myID  = useContext(context);
  const MsgInput = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    socket.on("getNewMsg", (message)=>{
      console.log(messages);
      setMessages((pre) => {return[...pre, message]})
    })
  },[])

  const displayMessages = () =>{
    const allMessage = messages.map((message : Types.message)=>{
      return <Message message={message} />
    })
    console.log(allMessage);
    return allMessage
  }
  
  const sendMessage = (event: React.KeyboardEvent<HTMLFormElement>) =>{
      event.preventDefault();
      event.stopPropagation();
      const messageObj = {
        author:  myID.userName,
        content : MsgInput.current?.value,
        time : new Date()
      }
      console.log(messageObj);
      MsgInput.current!.value = ""
      socket.emit("sendMessage", (messageObj))
  }
  return (
    <div>
      {displayMessages()}
      <form onSubmit={sendMessage}>
        <input ref={MsgInput}/>
      </form>
    </div>
  )
}
