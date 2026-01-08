import express, { Express, Request, Response } from "express";
import { Server } from "http";
import { ServerInfo } from "../shared/ServerInfo";
import bodyParser from "body-parser";
import { Server as SocketServer } from "socket.io";
import { ChatInfo } from "../shared/ChatInfo";
import { createServer } from "http";
import { ClientToServerEvents, ServerToClientEvents } from "./types/ServerEvents";
import { engine } from 'express-handlebars';
import YouTubeChatAPI from "./YouTubeChatAPI";

export default class ChatServer {
    private app: Express;
    private server: Server | null;
    private ioServer: SocketServer;

    constructor() {
        this.app = express();
        this.configureApp();
        this.configureRoutes();

        /* Implementing the APIs of streaming services */
        new YouTubeChatAPI(this);
    }

    private configureApp(): void {
        const hbs = engine({
            extname: '.hbs',
            helpers: {
                eq: (a: any, b: any): boolean => a === b,
                gt: (a: number, b: number): boolean => a > b,
                formatDate: (date: Date): string => {
                    return date.toLocaleDateString();
                }
            }
        });

        this.app.engine('.hbs', hbs);
        this.app.set('view engine', '.hbs');
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('libs'));
    }

    private configureRoutes(): void {
        this.app.get("/", (request: Request, response: Response) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.render('chat.hbs', {
                port: Number(this.getServerInfo().port)
            });
        });
    }

    public async serveServer(): Promise<Server | null> {
        try {
            this.server = createServer(this.app);
            this.server.listen(0, () => {
                console.log(`Express server was launched at ${this.server.address().port}`);
            });

            this.ioServer = new SocketServer<ClientToServerEvents, ServerToClientEvents>(this.server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
            this.ioServer.on("connection", () => {
                console.log(`\x1b[44m` + `\x1b[37m` + ` INFO ` + `\x1b[40m` + `\x1b[0m` 
                + ` Detected a connection to chat`+ `\x1b[0m`);
            });

            return this.server;
        } catch (error) {
            console.log(`Error in running the app: ${error}`);
            return null;
        }
    }

    public getSocketIO(): SocketServer {
        return this.ioServer;
    }

    public getServerInfo(): ServerInfo {
        return {
            port: this.server.address().port || 0
        } as ServerInfo;
    }

    public getChatConfiguration(): ChatInfo {
        return {
            fontSize: 14
        } as ChatInfo;
    }
}

