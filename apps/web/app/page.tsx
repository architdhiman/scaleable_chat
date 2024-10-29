'use client'
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useSocket } from "./context/SocketProvider";
import { useState } from "react";

export default function Home() {
  const {sendMessage,messages} = useSocket()
  const [message,setMessage] = useState('')

  return(    
    <div>
      

      <div>
        <input onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="Message..." />
        <button onClick={(e)=>sendMessage(message)}>SEND</button>
      </div>

      <div>
        <h1>All messages will appear here</h1>
        {messages.map((message)=>{
          return(
          <>
          <li>{message}</li>
          </>
          )
        })}
      </div>


    </div>
    
  )
}
