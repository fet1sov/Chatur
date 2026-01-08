export interface ServerToClientEvents {
    youtubeMessage: (message: JSON) => void;
}

export interface ClientToServerEvents {}