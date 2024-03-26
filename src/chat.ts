import { TubeChat } from 'tubechat';
import { ChatSocket } from './socket';

interface YoutubeMessage {
    messageId: string,
    nickname: string,
    messageText: string,
    roles: Array<string>
}

export class YoutubeChat {
    tubeChat : TubeChat;

    constructor(ChatSocket: ChatSocket)
    {
        this.tubeChat = new TubeChat();

        this.tubeChat.on('chat_connected', (channel, videoId) => {
            console.log(`\x1b[42m` + `\x1b[37m` + ` SUCCESS ` + `\x1b[40m` + `\x1b[0m` 
            + ` Connected chat ` + `\x1b[32m` + channel + `\x1b[0m` + ` to ` + `\x1b[32m` + videoId + `\x1b[0m`);
        });

        this.tubeChat.on('message', ({ badges, channel, channelId, color, id, isMembership, isModerator, isNewMember, isOwner, isVerified, message, name, thumbnail, timestamp }) => {
            let youtubeMessage : YoutubeMessage = {
                messageId: id,
                nickname: name,
                messageText: message[0].text,
                roles: []
            } as YoutubeMessage;
            ChatSocket.io.emit("youtubeMessage", youtubeMessage);
        });

        this.tubeChat.on("deleted_message", ({ commentId }) => {
            let youtubeMessage : YoutubeMessage = {
                messageId: commentId,
            } as YoutubeMessage;
            ChatSocket.io.emit("youtubeMessageDelete", youtubeMessage);
        })
    }

    /**
     * Connects the youtube chat and waits until it goes live
     * @param channelTag Channel username
     *  
     * Might borrowed from link example youtube.com/@fet1sov999
     * username is @fet1sov999
     */
    connectChannel(channelTag: string) : void
    {
        this.tubeChat.connect(channelTag);
    }
}
