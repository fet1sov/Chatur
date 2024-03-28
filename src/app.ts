import express, { Express, Request, Response, json } from "express";
import { createServer } from 'http';

import { YoutubeChat } from "./chat";
import { Config } from "./config";
import { ChatSocket } from "./socket";

const app: Express = express();
const port = process.env.PORT || 3000;

const config: Config = new Config(__dirname + '/../config/config.json');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/../_public/'));

app.get("/", (request: Request, response: Response) => {
  response.header("Access-Control-Allow-Origin", "*");

  response.render('chat', {
    port: port
  });
});

app.get("/settings", (request: Request, response: Response) => {
  response.render('settings', {
    port: port
  });
});

app.post("/settings", (request: Request, response: Response) => {
  request.body.

  response.render('settings', {
    port: port
  });
});

const httpServer = createServer(app);

const chatSocket: ChatSocket = new ChatSocket(httpServer);
const ytChat: YoutubeChat = new YoutubeChat(chatSocket);

httpServer.listen(port, () => {
  console.log(`\x1b[100m` + ` SETTINGS ` + `\x1b[40m` + `\x1b[0m` + ` Chat settings available ` + `\x1b[32m` + `http://localhost:${port}/settings` + `\x1b[0m`);
  ytChat.connectChannel(config.getChannelTag());
});