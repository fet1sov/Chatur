import * as fs from 'fs';

interface ConfigData {
    channelTag: string;
}

export class Config 
{
    configuration : ConfigData;
    constructor(configFilePath: string)
    {
        if (fs.existsSync(configFilePath)) {
            let rawData : string = fs.readFileSync(configFilePath, 'utf8');
            this.configuration = JSON.parse(rawData);
        } else {
            this.configuration = { channelTag: "" } as ConfigData;
        }
    }

    /**
     * Getting the channel tag from config
     * @return Channel username
     */
    getChannelTag() : string {
        return this.configuration.channelTag;
    }
}