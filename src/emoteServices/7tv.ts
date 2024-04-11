import { request, gql } from "graphql-request";
import { resolve } from "path";

const baseURI = "https://7tv.io/v3/gql";

export class SevenTVWrapper {

    async searchEmote(emoteName: string) : Promise<any>
    {
        let emoteSchema = gql`
            query Emotes {
                emotes(
                    query: "` + emoteName + `"
                    filter: {
                        exact_match: true
                        ignore_tags: true
                        case_sensitive: true
                        personal_use: false
                    }
                ) {
                    items {
                        id
                        name
                    }
                }
            }
        `;

        return await request(baseURI, emoteSchema).then((data : any) => {
            data.emotes.items.forEach(emote => {
                if (emote.name.toLowerCase() == emoteName.toLowerCase())
                {
                    resolve(emote.id);
                    return;
                }
            });

            resolve("");
        });
    }
}