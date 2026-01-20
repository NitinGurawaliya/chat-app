import WebSocket, { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:3000})

interface User{
    socket:WebSocket;
    room:string
}

let allSockets :User[] = [];



// join room 
// {"type":"join",
//   "payload":{
//      "roomId":"123"
//    }

// }

// send a message
// {
//     type:"chat ",
//     payload:{
//         message:"ehllo"
//     }
// }


ws.on("connection",(socket)=>{


    socket.on("message",(message)=>{

        console.log("message received from frontned", message)
        //@ts-ignore
        const parsedMessage = JSON.parse(message)

        if(parsedMessage.type==="join"){
            console.log("user joined room " + parsedMessage.payload.roomId)
            allSockets.push({
                socket,
                room:parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type ==="chat"){

            let currentUserRoom = null;

            for (let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.socket ===socket){
                    currentUserRoom =allSockets[i]?.room
        
                }
                console.log("user found in room no "+currentUserRoom)
            }

            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.room===currentUserRoom){
                    allSockets[i]?.socket.send(parsedMessage.payload.message)
                }
            }

        }
    })

})