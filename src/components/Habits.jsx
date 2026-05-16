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
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Forge a new habit..." 
                    className="flex-1 bg-slate-800/50 border border-slate-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all placeholder:text-slate-500 shadow-inner"
                />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-xl py-4 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">+</button>
            </form>

            <div className="space-y-4">
                <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-2">Daily Quests</h2>
                {habits.length === 0 && <p className="text-slate-600 text-center mt-8 italic">Your quest log is empty.</p>}
                
                {habits.map(habit => (
                    <div key={habit.id} onClick={() => toggleHabit(habit.id)} 
                        className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${habit.completedToday ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-slate-800 border-slate-700 hover:border-slate-600 shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${habit.completedToday ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600 bg-slate-900'}`}>
                                {habit.completedToday && <span className="text-slate-900 text-sm font-black">✓</span>}
                            </div>
                            <span className={`text-lg font-medium transition-colors ${habit.completedToday ? 'text-slate-500 line-through' : 'text-slate-100'}`}>{habit.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}