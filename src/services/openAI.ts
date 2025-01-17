import axios from "axios";

// Access environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const VITE_OPENAI_API_CHAT_URL = import.meta.env.VITE_OPENAI_API_CHAT_URL;
const VITE_OPENAI_API_IMAGE_URL = import.meta.env.VITE_OPENAI_API_IMAGE_URL;

if (!OPENAI_API_KEY) {
  throw new Error("OpenAI API key is missing.");
}

export async function callChatAPI(prompt: string): Promise<string | undefined> {
  try {
    const response = await axios.post(
      VITE_OPENAI_API_CHAT_URL,
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const data = response.data;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI Chat API:", error);
    return undefined;
  }
}

export async function callImageAPI(prompt: string): Promise<string | undefined> {
  try {
    const response = await axios.post(
      VITE_OPENAI_API_IMAGE_URL,
      {
        model: "dall-e-3",
        prompt: prompt.substring(0,999),
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const data = response.data.data;
    console.log({data})
    return data[0].url;
  } catch (error) {
    console.error("Error calling OpenAI Image API:", error);
    return undefined;
  }
}

export async function sendChatContextPrompt(context: string, prompt: string) {
  return callChatAPI(context + "\n\n" + prompt);
}
