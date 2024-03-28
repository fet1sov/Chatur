import * as fs from 'fs';

interface ConfigData {
    channelTag: string;
}

export class Config 
{
    configFilePath: string;
    configuration : ConfigData;

    /**
     * Initialize the config
     * @param configFilePath path to configuration file
     */
    constructor(configFilePath: string)
    {
        this.configFilePath = configFilePath;

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

    /**
     * Setting the channel tag to config
     * @param channelTag Channel username
     */
    setChannelTag(channelTag : string) : void {
        this.configuration.channelTag = channelTag;

        fs.writeFile(this.configFilePath, JSON.stringify(this.configuration), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}