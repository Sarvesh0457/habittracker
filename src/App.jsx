import { useState, useEffect } from 'react';
import Habits from './components/Habits';
import Dashboard from './components/Dashboard';
import Arena from './components/Arena';
import { getLevelData } from './utils/gameLogic';

const getTodayStr = () => new Date().toLocaleDateString('en-CA');

export default function App() {
    const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('habits')) || []);
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp')) || 0);
    const [globalStreak, setGlobalStreak] = useState(() => parseInt(localStorage.getItem('globalStreak')) || 0);
    const [lastActive, setLastActive] = useState(() => localStorage.getItem('lastActive') || '');
    const [activeTab, setActiveTab] = useState('habits');

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
        localStorage.setItem('xp', xp.toString());
        localStorage.setItem('globalStreak', globalStreak.toString());
        localStorage.setItem('lastActive', lastActive);
    }, [habits, xp, globalStreak, lastActive]);

    const toggleHabit = (id) => {
        const today = getTodayStr();
        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                const isCompleting = !habit.completedToday;
                setXp(prev => Math.max(0, prev + (isCompleting ? 50 : -50)));
                return { ...habit, completedToday: isCompleting };
            }
            return habit;
        });

        const allCompletedNow = updatedHabits.length > 0 && updatedHabits.every(h => h.completedToday);
        if (allCompletedNow && lastActive !== today) {
            setGlobalStreak(prev => prev + 1);
            setLastActive(today);
        } else if (!allCompletedNow && lastActive === today) {
            setGlobalStreak(prev => Math.max(0, prev - 1));
            setLastActive(''); 
        }
        setHabits(updatedHabits);
    };

    const addHabit = (title) => setHabits([...habits, { id: Date.now(), title, completedToday: false }]);
    const currentLevel = getLevelData(xp);

    return (
        /* CHANGED: Deep Slate Blue background (#0B1121) instead of pure black */
        <div className="min-h-screen w-full bg-[#0B1121] text-slate-100 font-sans selection:bg-emerald-500/30 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]">
            
            <div className="max-w-2xl mx-auto w-full min-h-screen flex flex-col relative px-5 sm:px-0 pt-12 pb-32">
                
                {/* Header */}
                <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-700/50">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-xs font-mono text-slate-300 tracking-wider">SYSTEM ONLINE</span>
                        </div>
                        {/* CHANGED: Brightened text */}
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white drop-shadow-md">
                            Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{currentLevel.level}</span>
                        </h1>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{currentLevel.title}</p>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-lg">
                            <span className="text-orange-400 text-sm">🔥</span>
                            <span className="text-orange-300 font-mono text-sm font-bold">{globalStreak} <span className="text-orange-400/70">DAYS</span></span>
                        </div>
                        <div className="text-3xl font-black tracking-tighter text-white">
                            {xp} <span className="text-emerald-400 text-base font-bold uppercase tracking-widest">XP</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full z-10">
                    {activeTab === 'habits' && <Habits habits={habits} toggleHabit={toggleHabit} addHabit={addHabit} />}
                    {activeTab === 'dashboard' && <Dashboard xp={xp} currentLevel={currentLevel} globalStreak={globalStreak} />}
                    {activeTab === 'arena' && <Arena xp={xp} />}
                </div>

                {/* CHANGED: Lighter Dock Background */}
                <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50 px-4">
                    <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 p-2 bg-[#131C31]/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl">
                        {[
                            { id: 'habits', icon: '⌘', label: 'Quests' },
                            { id: 'dashboard', icon: '∆', label: 'Journey' },
                            { id: 'arena', icon: '⍟', label: 'Arena' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-slate-200 text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                                <span className={`text-lg ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500'}`}>{tab.icon}</span>
                                <span className="text-sm tracking-wide">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}