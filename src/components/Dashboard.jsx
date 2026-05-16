import { useMemo } from 'react';

export default function Dashboard({ xp, currentLevel, globalStreak }) {
    const progressPercent = ((xp - currentLevel.xpRequired) / (currentLevel.nextAt - currentLevel.xpRequired)) * 100;

    // This maps the last 30 days based on your actual global streak!
    const gridDays = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            // i goes from 0 to 29. 29 is "Today". 
            // If globalStreak is 3, then boxes 27, 28, and 29 will be green.
            const isGreen = i >= 30 - globalStreak;
            return (
                <div key={i} className={`w-[14px] h-[14px] rounded-[3px] transition-all duration-500 ${isGreen ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-800 border border-slate-700'}`}></div>
            );
        });
    }, [globalStreak]); // Re-calculates if streak changes

    return (
        <div className="animate-fade-in space-y-8">
            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Progress to Lvl {currentLevel.level + 1}</h2>
                <div className="w-full bg-slate-900 rounded-full h-4 mb-3 overflow-hidden border border-slate-900 shadow-inner">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-4 rounded-full transition-all duration-700 relative" style={{ width: `${progressPercent}%` }}>
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-sm rounded-full"></div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 font-medium text-right"><span className="text-emerald-400">{xp}</span> / {currentLevel.nextAt} XP</p>
            </div>

            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">30-Day Consistency Map</h2>
                <div className="flex flex-wrap gap-1.5 justify-center">
                    {gridDays}
                </div>
                <div className="flex gap-4 mt-5 text-xs text-slate-500 justify-center font-medium">
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-800 border border-slate-700 rounded-sm"></div> Missed</span>
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-sm shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div> Nailed It</span>
                </div>
            </div>
        </div>
    );
}