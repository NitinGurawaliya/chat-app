import { WebSocketServer } from "ws";
const ws = new WebSocketServer({ port: 3000 });
let userCount = 0;
let allSockets = [];
ws.on("connection", (socket) => {
    allSockets.push(socket);
    socket.on("message", (event) => {
        console.log("message recieved " + event.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s?.send(event.toString() + ": recieved");
        }
    });
});
//# sourceMappingURL=index.js.map