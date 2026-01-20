
import { useEffect, useState } from 'react'

function App() {


  const [message, setMessage] = useState("")
  const[messages,setMessages] = useState([""])
  const [socket,setSocket] = useState("")
  const[roomId,setRoomId] = useState("")

  function sendMessage(){

    if(!socket){
      return;
    }

    //@ts-ignore
    socket.send(JSON.stringify({
      type:"chat",
      payload:{
        message:message
      }
    }))
    
    }

    function joinRoom(){
      if(!socket){
        return;
      }

      //@ts-ignore
      socket.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:roomId
        }
      }))


    }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3000")

    setSocket(ws)
    
    ws.onmessage = (event)=>{
      setMessages(m=>[...m,event.data])
    }
  },[])

  
  return (
    <div className='m-2'>

      <div className='text-black'>chat app</div>

      <div>room </div>

      <div className='flex gap-2'>
        <input
        className='bg-black text-white rounded-sm p-2'
         onChange={(e)=>{
          setRoomId(e.target.value)
        }} placeholder='enter room id to join' />

        <button className='bg-black text-white rounded-md p-2'
         onClick={joinRoom}>
          join room 
        </button>

      </div>

      <div className='flex gap-2 m-2'>
        <input
        className='bg-black text-white rounded-sm p-2'
         placeholder='enter message to send ' onChange={(e)=>{
          setMessage(e.target.value)
        }} />

        <button className='bg-black text-white rounded-md p-2'
        onClick={sendMessage}>send message</button>
      </div>

      <div>{messages.map(message=><div>{message}</div>)}</div>
    </div>

  )
}

export default App
