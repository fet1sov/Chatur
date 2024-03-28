import express, { Express, Request, Response } from "express";
import { createServer } from 'http';
import bodyParser from 'body-parser';

import { YoutubeChat } from "./chat";
import { Config } from "./config";
import { ChatSocket } from "./socket";

const app: Express = express();
const port = process.env.PORT || 3000;

const config: Config = new Config(__dirname + '/../config/config.json');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../_public/'));

app.get("/chat", (request: Request, response: Response) => {
  response.header("Access-Control-Allow-Origin", "*");

  response.render('chat', {
    port: port,
    configuration: config.configuration
  });
});

app.get("/", (request: Request, response: Response) => {
  response.render('settings', {
    port: port,
    configuration: config.configuration
  });
});

app.post("/", (request: Request, response: Response) => {
  config.setChannelTag(request.body.channelTag);
  ytChat.connectChannel(config.getChannelTag());

  response.render('settings', {
    port: port,
    configuration: config.configuration,
    message: {
      type: "",
      text: "Success: updated settings"
    }
  });
});

const httpServer = createServer(app);

const chatSocket: ChatSocket = new ChatSocket(httpServer);
const ytChat: YoutubeChat = new YoutubeChat(chatSocket);

httpServer.listen(port, () => {
  console.log(`
  █████████████████████████████████████
  █                                   █
  █   \x1b[5m\x1b[31mINSERT INTO BROWSER SOURCE\x1b[0m      █
  █   \x1b[32mhttp://127.0.0.1:${port}/chat\x1b[0m      █
  █                                   █
  █████████████████████████████████████
  \n`);

  console.log(`\x1b[100m` + ` SETTINGS ` + `\x1b[40m` + `\x1b[0m` + ` Chat settings panel available ` + `\x1b[32m` + `http://127.0.0.1:${port}/` + `\x1b[0m`);
  ytChat.connectChannel(config.getChannelTag());
});