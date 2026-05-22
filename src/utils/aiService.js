import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (Vite uses import.meta.env for environment variables)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateMicroHabits = async (goal) => {
    try {
        const prompt = `Break down the goal "${goal}" into 3 daily, actionable micro-habits. Keep each habit under 6 words. Return ONLY a valid JSON array of strings, nothing else. Example: ["Drink 2L water", "Stretch for 5 mins", "Do 10 pushups"]`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        
        // Clean the response in case Gemini adds markdown (```json ... ```)
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Error:", error);
        return ["Failed to connect to AI", "Try again later"];
    }
};

export const generateMentorAdvice = async (stats) => {
    try {
        const { level, xp, streak, habits = [] } = stats;
        const completedCount = habits.filter(h => h && h.completedToday).length;
        
        const prompt = `Act as a wise, encouraging productivity mentor. The user is Level ${level} with ${xp} XP and a ${streak}-day consistency streak. Today, they have completed ${completedCount} out of ${habits.length} daily goals. Give them a 2-sentence motivational insight. Be crisp, inspiring, and acknowledge their specific stats. Do not use emojis.`;
        
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("🚨 Mentor AI Error Details:", error);
        return "The Mentor is currently analyzing your data. Please try again in a moment.";
    }
};