import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: "Reply with only: openai connected",
  });

  console.log(response.output_text);
}

test();