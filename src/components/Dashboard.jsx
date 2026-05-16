import { useMemo } from 'react';

export default function Dashboard({ xp, currentLevel }) {
    const progressPercent = ((xp - currentLevel.xpRequired) / (currentLevel.nextAt - currentLevel.xpRequired)) * 100;

    // Fix: useMemo ensures the random mockup doesn't re-render constantly
    const gridDays = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const isGreen = Math.random() > 0.4;
            const isFreeze = Math.random() > 0.8 && !isGreen;
            return (
                <div key={i} className={`w-3 h-3 rounded-sm ${isGreen ? 'bg-emerald-500' : isFreeze ? 'bg-cyan-400' : 'bg-slate-700'}`}></div>
            );
        });
    }, []);

    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h2 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Progress to Level {currentLevel.level + 1}</h2>
                <div className="w-full bg-slate-900 rounded-full h-4 mb-2 overflow-hidden border border-slate-700">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 text-right">{currentLevel.nextAt - xp} XP remaining</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h2 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">Consistency Map</h2>
                <div className="flex flex-wrap gap-1">
                    {gridDays}
                </div>
            </div>
        </div>
    );
}