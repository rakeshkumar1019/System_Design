import  { WebSocketServer, WebSocket } from "ws";
import express from "express";

const app = express();
// https://github.com/websockets/ws
// https://hoppscotch.io/realtime/websocket
const httpServer= app.listen(3000, function () {
    console.log((new Date), "Server is listining on port 3000")
})
const wss = new WebSocketServer({ server:httpServer });

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
        });
    });

    socket.send('Hello! Message From Server!!!')
})




// Additional error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});