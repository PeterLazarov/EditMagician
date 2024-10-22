import axios from "axios";

// Access environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL;

if (!OPENAI_API_KEY) {
  throw new Error("OpenAI API key is missing.");
}

export async function callOpenAI(prompt: string): Promise<string | undefined> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
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
    console.error("Error calling OpenAI API:", error);
    return undefined;
  }
}

export async function sendContextPrompt(context: string, prompt: string) {
  return callOpenAI(context + "\n\n" + prompt);
}
