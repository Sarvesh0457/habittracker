export const generateMicroHabits = async (goal) => {
    try {
        const prompt = `Break down the goal "${goal}" into 3 daily, actionable micro-habits. Keep each habit under 6 words. Return ONLY a valid JSON array of strings, nothing else. Example: ["Drink 2L water", "Stretch for 5 mins", "Do 10 pushups"]`;
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, isJson: true }) // Tell backend we expect JSON
        });

        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        
        return await response.json();
    } catch (error) {
        console.error("AI Service Error:", error);
        return ["AI is resting", "Try manually typing", "Check connection"];
    }
};

export const generateMentorAdvice = async (stats) => {
    try {
        const { level, xp, streak, habits = [] } = stats;
        const completedCount = habits.filter(h => h && h.completedToday).length;
        
        const prompt = `Act as a wise, encouraging productivity mentor. The user is Level ${level} with ${xp} XP and a ${streak}-day consistency streak. Today, they have completed ${completedCount} out of ${habits.length} daily quests. Give them a 2-sentence motivational insight. Be crisp, inspiring, and acknowledge their specific stats. Do not use emojis.`;
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, isJson: false }) // Tell backend we expect Text
        });

        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
        
        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("AI Service Error:", error);
        return "The Mentor is currently analyzing your data. Please try again in a moment.";
    }
};