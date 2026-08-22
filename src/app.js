import http from "http";
import express from "express";
import { Server } from "socket.io";
import historyController from './controllers/historyController.js';
import { initializeSockets } from "./websockets/socketHandler.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server);
/* global process */
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", historyController);

initializeSockets(io);

server.listen(PORT, () => {
    return console.log(`Server is running on port ${PORT}`);
});