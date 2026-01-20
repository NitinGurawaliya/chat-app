import WebSocket, { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:3000})

interface User{
    socket:WebSocket;
    room:string
}

let allSockets :User[] = [];


ws.on("connection",(socket)=>{

    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message)

        if(parsedMessage.type==="join"){
            allSockets.push({
                socket,
                room:parsedMessage.payload.room
            })
        }
    })

})