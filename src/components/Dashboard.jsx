import { useMemo, useState } from 'react';
import { generateOracleAdvice } from '../utils/aiService';

export default function Dashboard({ xp, currentLevel, globalStreak, habits}) {
    const [oracleMessage, setOracleMessage] = useState("");
    const [isOracleThinking, setIsOracleThinking] = useState(false);

    const progressPercent = ((xp - currentLevel.xpRequired) / (currentLevel.nextAt - currentLevel.xpRequired)) * 100;

    const gridDays = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const isCompleted = i >= 30 - globalStreak;
            return (
                <div key={i} className={`w-[14px] h-[14px] rounded-[4px] transition-all duration-500 ${isCompleted ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'bg-slate-100 border border-slate-200'}`}></div>
            );
        });
    }, [globalStreak]);

    const consultOracle = async () => {
        setIsOracleThinking(true);
        const stats = { level: currentLevel.level, xp, streak: globalStreak, habits };
        const message = await generateOracleAdvice(stats);
        setOracleMessage(message);
        setIsOracleThinking(false);
    };

    return (
        <div className="animate-fade-in space-y-8">

            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
                
                <h2 className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span>✨</span> The Arena Oracle
                </h2>
                
                {oracleMessage ? (
                    <div className="bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        <p className="text-white font-medium leading-relaxed italic text-sm">{oracleMessage}</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <p className="text-indigo-100 text-sm font-medium max-w-[200px]">Consult the Oracle for personalized quest guidance.</p>
                        <button 
                            onClick={consultOracle}
                            disabled={isOracleThinking}
                            className="active:scale-95 bg-white text-indigo-600 font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all disabled:opacity-70 disabled:animate-pulse"
                        >
                            {isOracleThinking ? "Consulting..." : "Seek Wisdom"}
                        </button>
                    </div>
                )}
            </div>

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