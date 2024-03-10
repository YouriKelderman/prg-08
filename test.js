import { ChatOpenAI } from "@langchain/openai"
import dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})
const joke = await model.invoke("Write me a song structure with chords thats about a man called larry, make sure it has pleasent, happy chords")
console.log(joke.content)