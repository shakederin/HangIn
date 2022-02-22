import React from 'react'

export default function Message(props: { message: Types.message}) {
    const msgObj = props.message 
    const time =(new Date(msgObj.time).toLocaleTimeString());
  return (
    <div>
        <div>{msgObj.author}</div>
        <div>{msgObj.content}</div>
        <div>{time}</div>
    </div>
  )
}
