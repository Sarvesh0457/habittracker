import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Look! It uses process.env now, which is safely hidden on the server
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // Grab the prompt the frontend sent us
        const { prompt, isJson } = req.body;

        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // If the frontend asked for JSON (like the habits list), clean it up
        if (isJson) {
            const match = text.match(/\[[\s\S]*\]/);
            if (match) {
                return res.status(200).json(JSON.parse(match[0]));
            } else {
                throw new Error("AI did not return an array.");
            }
        }

        // Otherwise, send back the text (like the Mentor message)
        return res.status(200).json({ text });

    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ error: "Failed to connect to AI." });
    }
}