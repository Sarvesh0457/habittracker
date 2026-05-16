import { useMemo } from 'react';

export default function Dashboard({ xp, currentLevel, globalStreak }) {
    const progressPercent = ((xp - currentLevel.xpRequired) / (currentLevel.nextAt - currentLevel.xpRequired)) * 100;

    const gridDays = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const isCompleted = i >= 30 - globalStreak;
            return (
                <div key={i} className={`w-[14px] h-[14px] rounded-[4px] transition-all duration-500 ${isCompleted ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'bg-slate-100 border border-slate-200'}`}></div>
            );
        });
    }, [globalStreak]);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Progress to Lvl {currentLevel.level + 1}</h2>
                <div className="w-full bg-slate-100 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-indigo-500 to-violet-400 h-4 rounded-full transition-all duration-700 relative" style={{ width: `${progressPercent}%` }}>
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-sm rounded-full"></div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 font-bold text-right"><span className="text-indigo-600">{xp}</span> / {currentLevel.nextAt} XP</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5">30-Day Consistency Map</h2>
                <div className="flex flex-wrap gap-1.5 justify-center">
                    {gridDays}
                </div>
                <div className="flex gap-5 mt-6 text-xs text-slate-500 justify-center font-bold">
                    <span className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-slate-100 border border-slate-200 rounded-md"></div> Missed</span>
                    <span className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-indigo-500 rounded-md shadow-sm"></div> Nailed It</span>
                </div>
            </div>
        </div>
    );
}