import { Cohere } from "@langchain/cohere";

const model = new Cohere({
    maxTokens: 100,
    apiKey: "Z4XxPEknzoCUblQlvY2EFAUJF0oEMCQ6kPt0Rc8K",
});
const res = await model.invoke(
    "Who was the most successful artist of all time?"
);
console.log({ res });