import * as fs from 'fs';
import * as path from 'path';

interface ConfigData {
    channelTag: string;
    fontSize: number;
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
            fs.mkdirSync(path.join(configFilePath, ".."));

            this.configuration = { 
                channelTag: "",
                fontSize: 18  
            } as ConfigData;

            fs.writeFileSync(this.configFilePath, JSON.stringify(this.configuration));
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

    /**
     * Getting the font size for live chat from config
     * @return Font size
     */
    getFontSize() : number {
        return this.configuration.fontSize;
    }

    /**
     * Setting font size for live chat to config
     * @param fontSize Font size
     */
    setFontSize(fontSize : number) : void {
        this.configuration.fontSize = fontSize;

        fs.writeFile(this.configFilePath, JSON.stringify(this.configuration), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}