import { useState } from 'react';

export default function Habits({ habits, toggleHabit, addHabit }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        addHabit(input);
        setInput("");
    };

    const completedCount = habits.filter(h => h.completedToday).length;
    const totalCount = habits.length;
    const isPerfectDay = totalCount > 0 && completedCount === totalCount;

    return (
        <div className="animate-fade-in space-y-8">
            
            {/* Indigo Progress Bar */}
            <div className={`flex items-center justify-between p-1.5 rounded-full border bg-white shadow-sm transition-all duration-500 ${isPerfectDay ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-200'}`}>
                <div className="flex-1 px-4">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-700 ${isPerfectDay ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-400'}`} style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }}></div>
                    </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${isPerfectDay ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                    {completedCount} / {totalCount} PROTOCOLS
                </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative group">
                <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
                    <div className="pl-6 pr-2 text-slate-400 font-mono text-xl">{'>'}</div>
                    <input 
                        type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder="Initialize new protocol..." 
                        autoFocus
                        className="flex-1 bg-transparent text-slate-900 px-3 py-5 focus:outline-none placeholder:text-slate-400 font-bold tracking-wide"
                    />
                    <button type="submit" className="mr-3 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md">
                        ENTER ↵
                    </button>
                </div>
            </form>

            <div className="space-y-3">
                {habits.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-slate-200 border-dashed">
                        <p className="text-slate-400 text-sm font-bold tracking-widest">NO PROTOCOLS DETECTED</p>
                        <p className="text-slate-400/70 text-xs mt-2 italic font-medium">"Motivation is what gets you started. Habit is what keeps you going."</p>
                    </div>
                )}
                
                {habits.map(habit => (
                    <div key={habit.id} onClick={() => toggleHabit(habit.id)} 
                        className={`active:scale-[0.98] group relative p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${habit.completedToday ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-white border-slate-200 shadow-sm'}`}>
                        
                        <div className="relative flex items-center gap-5 z-10 w-full">
                            <div className={`active:scale-90 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${habit.completedToday ? 'border-indigo-600 bg-indigo-600 shadow-md' : 'border-slate-300 bg-slate-50 group-hover:border-indigo-400'}`}>
                                {habit.completedToday && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                            
                            <span className={`text-lg font-bold tracking-wide transition-all duration-300 ${habit.completedToday ? 'text-indigo-400 line-through decoration-indigo-300 decoration-2' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                {habit.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}