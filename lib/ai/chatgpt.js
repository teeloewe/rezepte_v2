import OpenAI from "openai";
import { OPENAI_INSTRUCTIONS } from "../constants";
import { makeImageUrl } from "../constants";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const regex = /([{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}|["]{1}(([^(")]|\\")*)+(?<!\\)["]){1}/gis;
function jsonFromString(str) {
    const matches = str.match(regex);
    return matches.map((m) => JSON.parse(m));
}

export async function analyseFile(filename) {
    console.log(makeImageUrl(filename))

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text", text: OPENAI_INSTRUCTIONS,
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: makeImageUrl(filename)
                        }
                    }
                ]
            }
        ]
    })
    return jsonFromString(response.choices[0].message.content)
}