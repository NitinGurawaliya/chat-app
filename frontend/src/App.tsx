
import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [message, setMessage] = useState("")
  const [socket,setSocket] = useState("")

  function sendMessage(){

    if(!socket){
      return;
    }
    //@ts-ignore
    socket.send(message)
    }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3000")

    setSocket(ws)
    
    ws.onmessage = (ev)=>{
      alert(ev.data)
    }


  },[])

  
  return (
    <div>

      <div>chat app</div>

      <input onChange={(e)=>{
        setMessage(e.target.value)
      }} />

      <button onClick={sendMessage}>send message</button>


    </div>

  )
}

export default App
