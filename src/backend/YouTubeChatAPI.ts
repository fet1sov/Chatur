import { TubeChat } from "tubechat";
import { FlowMonitor } from 'flow-monitor';
import ChatServer from "./ChatServer";
import { IYoutubeMessage } from "./types/API/YouTubeMessage";

export default class YouTubeChatAPI {
    private chat: TubeChat;
    private fMonitor: FlowMonitor;

    constructor(chatServer: ChatServer)
    {
        this.chat = new TubeChat();
        this.fMonitor = new FlowMonitor();

        this.setupEvents(chatServer);
    }

    private setupEvents(chatServer: ChatServer) : void {
        this.chat.on('message', (message, chatId, userChannel, videoData) => {
            let userRoles : Array<string> = [];
            if (message.author.isModerator)
            {
                userRoles.push("moderator");
            } else if (message.author.isOwner) {
                userRoles.push("broadcaster");
            } else if (message.author.isVerified) {
                userRoles.push("verified");
            }
            
            let youtubeMessage : IYoutubeMessage = {
                messageId: message.id,
                nickname: message.author.channelName,
                messageText: message.message.map(part => part.text).join(''),
                roles: userRoles
            } as IYoutubeMessage;
            chatServer.getSocketIO().emit("youtubeMessage", youtubeMessage);
        });

        this.chat.on("deletedMessage", (messageId, chatId, userChannel, videoData) => {
            let youtubeMessage : IYoutubeMessage = {
                messageId: messageId,
            } as IYoutubeMessage;
            chatServer.getSocketIO().emit("youtubeMessageDelete", youtubeMessage);
        });
    }

    public connectChannel(channelTag: string): void {
        this.fMonitor.connect(channelTag, 'youtube');
        this.fMonitor.on('streamUp', (channel, vod) => {
            this.chat.join(vod.id);
        });
    }
}