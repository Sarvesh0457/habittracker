import { useState } from 'react';

export default function Habits({ habits, toggleHabit, addHabit }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        addHabit(input);
        setInput("");
    };

    return (
        <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Forge a new habit..." 
                    className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition">+</button>
            </form>

            <div className="space-y-3">
                {habits.map(habit => (
                    <div key={habit.id} onClick={() => toggleHabit(habit.id)} 
                        className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${habit.completedToday ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${habit.completedToday ? 'border-emerald-500 bg-emerald-500' : 'border-slate-500'}`}>
                                {habit.completedToday && <span className="text-slate-900 text-xs font-bold">✓</span>}
                            </div>
                            <span className={`font-medium ${habit.completedToday ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{habit.title}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-md">
                            <span className="text-orange-400 text-xs">🔥</span>
                            <span className="text-slate-300 text-xs font-bold">{habit.streak}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}