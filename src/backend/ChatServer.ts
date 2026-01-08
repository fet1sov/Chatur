import express, { Express } from "express";
import { Server } from "http";
import { ServerInfo } from "../shared/ServerInfo";

export default class ChatServer {
    private app: Express;
    private server: Server | null;

    constructor() {
        this.app = express();
    }

    public async serveServer(): Promise<Server | null> {
        try {
            this.server = this.app.listen(0, () => {
                console.log(`Express server was launched at ${this.server.address().port}`);
            });
            return this.server;
        } catch (error) {
            console.log(`Error in running the app: ${error}`);
            return null;
        }
    }

    public getServerInfo(): ServerInfo {
        return {
            port: this.server.address().port || 0
        } as ServerInfo;
    }
}

