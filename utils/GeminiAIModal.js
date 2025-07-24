const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  // Set up the API key
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Define the model (Gemini 2.5 Pro)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });
  
  // ✅ Export the chat session (unchanged)
  const chatSession = model.startChat({});
  module.exports.chatSession = chatSession;
  
  // ✅ Run the async call separately
  async function run() {
    const result = await chatSession.sendMessage(`json
  
  {
    "question": "Describe your experience with React and Node.js",
    "jobPosition": "Full Stack Developer",
    "jobDescription": "React, Node.js, MySQL"
  }`);
  
    const response = await result.response;
    const text = await response.text(); // ⚠️ Await this!
    
  }
  
  
  