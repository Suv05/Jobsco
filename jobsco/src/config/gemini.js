import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDAEMGH6CUH6lcK0aq4rZrRBGceNF-yHXA";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text(); // Ensure proper handling of response
    console.log("response from gemini.js:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw new Error("Gemini API error");
  }
}

export default run;
