import express from "express";

const router = express.Router();
import {ChatOpenAI} from "@langchain/openai"

import dotenv from 'dotenv'

dotenv.config();
let chatHistory = [];
let chatHistoryJSON = [];

router.get('/clear', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    chatHistory = [];
    console.log("chat cleared");
    return ("chat cleared");

});

router.post('/bot', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const Input = req.body.input;
        const rhymeWords = req.body.rhymes;
        const keyword = req.body.keywords;
        const model = new ChatOpenAI({
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
            azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
            azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
            temperature: 0.1,
            streaming: true,
        })
        const promptTemp = `You are a creative and helpful AI music making assistant called Varia that ONLY speaks json. your job is to help the person with whatever music task they may have.
You should always call yourself Varia.
Your job is to be as clear as possible about what the user wants. For example some things you should NOT do are:
1. don't Change anything a user didn't specifically ask you to change,
2. don't give vague instructions, like "I added more distortion to make it sound more metal", if you want to do something like that specifically tell the user to add more distortion.

You will assist the user with whatever music related question or task they have, like giving them chords with songs.

If the user asks for you to generate any lyrics, poems, songs or rhymes for example, make sure they are related to the provided keyword, the keyword is: ${keyword}.
To help come up with some words that rhyme with the keyword, take a look at the list thats between the [rhymewords][/rhymewords] tag:
[rhymewords]${rhymeWords}[/rhymewords].

If you generate anything that includes chords, put them in a Span element with the classname "chordSpan"
For example a chord progression could look like this: "[Chord]Em[/Chord] [Chord]Em[/Chord]"
To summarize:
1. Remember you're speficially a music assistant bot called Varia,
2. Do not change anything the user didn't specifically ask you to change.
3. Always be clear what you changed and what the user should do to implement this feedback.
4. If making chords, put them in between [Chord][/Chord] tags.
Now you need to interact with the user, here is exactly what the user wants:
${Input}


To better understand the context of our current conversation, please take a look at the summary you wrote in your last response and base your answer on this summary. You will find this history within the [History]${chatHistory}[/History] tag
If there is a summary there, write your answers according to what we previously discussed.
[History]${chatHistory}[/History]

Take the previously discussed chat history found in the [history][/history] tag and add a short summary of our last exchange to it, do not remove the old text.
"${chatHistory}.".
When expending this text, please add the following two lines to the previous chat history:
 "User asked:
 Varia answered:".
If you generated things like chords or lyrics, save them exactly as they are to the summary so you can reference them later if needed.


your response should always follow this format:
{
"response": "Your response to prompt",
"summary": ""
}
Ensure this is correct JSON.
Fill the "summary" field with your summary of our conversation plus the previous chat history.
Do not format is like "Varia: answer" but instead follow the format mentioned above.

always ensure that your answers will result in correct JSON formatting, for example watch out with the quotes and character control.
`;
        const output = await model.invoke(promptTemp)
        console.log(output)
        const outputJson = JSON.parse(output.content);
        res.json(outputJson);
        chatHistory = outputJson.summary;
    } catch (error) {
        console.error("Error generating answer:", error);
        res.status(500).json({error: "An error occured while generating Varia's response"});
    }


});

export default router;