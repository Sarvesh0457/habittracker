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
            
            {/* Status Bar */}
            <div className={`flex items-center justify-between p-1 rounded-full border transition-all duration-500 ${isPerfectDay ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}>
                <div className="flex-1 px-4">
                    <div className="w-full bg-black/50 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${isPerfectDay ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-slate-500'}`} style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }}></div>
                    </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold ${isPerfectDay ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/10 text-slate-400'}`}>
                    {completedCount} / {totalCount} PROTOCOLS
                </div>
            </div>

            {/* Command Palette Input */}
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0F0F0F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl focus-within:border-emerald-500/50 transition-all">
                    <div className="pl-6 pr-2 text-slate-500 font-mono text-xl">{'>'}</div>
                    <input 
                        type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder="Initialize new protocol..." 
                        className="flex-1 bg-transparent text-white px-3 py-5 focus:outline-none placeholder:text-slate-600 font-medium tracking-wide"
                    />
                    <button type="submit" className="mr-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200">
                        ENTER ↵
                    </button>
                </div>
            </form>

            {/* List Array */}
            <div className="space-y-3">
                {habits.length === 0 && (
                    <div className="text-center py-16 bg-[#0F0F0F] rounded-2xl border border-white/5 border-dashed">
                        <p className="text-slate-500 text-sm font-medium font-mono">NO PROTOCOLS DETECTED</p>
                    </div>
                )}
                
                {habits.map(habit => (
                    <div key={habit.id} onClick={() => toggleHabit(habit.id)} 
                        className={`group relative p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${habit.completedToday ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_10px_30px_rgba(16,185,129,0.05)]' : 'bg-[#0F0F0F] border-white/5 hover:border-white/10'}`}>
                        
                        <div className="relative flex items-center gap-5 z-10 w-full">
                            {/* Pro-Tier Checkbox */}
                            <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-300 ${habit.completedToday ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'border-slate-700 bg-black group-hover:border-slate-500'}`}>
                                {habit.completedToday && (
                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                            
                            <span className={`text-lg font-medium tracking-wide transition-all duration-300 ${habit.completedToday ? 'text-slate-500 line-through decoration-slate-700 decoration-2' : 'text-slate-200 group-hover:text-white'}`}>
                                {habit.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}