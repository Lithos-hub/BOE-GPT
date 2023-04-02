import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-Cf5OrSHzwtPORWc8wT4Zo5vG",
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
