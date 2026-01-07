import express, { Express, Request, Response, NextFunction } from "express";
import { Server } from "http";
import { GlobalConfiguration } from "../configuration";

export default class ChatServer {
    private app: Express;
    private server: Server | null;

    constructor() {
        this.app = express();
    }

    public async serveServer(): Promise<Server> {
        return new Promise((resolve, reject) => {
            try {
                this.server = this.app.listen(0, () => {
                    console.log(`Express server was launched at ${this.server.address().port}`);
                    GlobalConfiguration.httpServerPort = Number(this.server.address().port);
                });
                resolve(this.server);
            } catch (error) {
                reject(error);
            }
        });
    }
}

