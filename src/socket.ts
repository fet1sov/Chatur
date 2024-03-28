import { Server } from "socket.io";

interface ServerToClientEvents {
    youtubeMessage: (message: JSON) => void;
}

interface ClientToServerEvents {}

export class ChatSocket {
    io : Server;

    constructor(httpServer: any)
    {
        this.io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        this.io.on("connection", (socket) => {
            console.log(`\x1b[44m` + `\x1b[37m` + ` INFO ` + `\x1b[40m` + `\x1b[0m` 
            + ` Detected a connection to chat`+ `\x1b[0m`);
        });

        this.io.on("settings", (socket) => {
            console.log(`\x1b[44m` + `\x1b[37m` + ` INFO ` + `\x1b[40m` + `\x1b[0m` 
            + ` Detected a connection to chat`+ `\x1b[0m`);
        });
    }
}