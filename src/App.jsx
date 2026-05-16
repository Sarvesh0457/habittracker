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

    // The Untick Logic Fix
    const toggleHabit = (id) => {
      const today = getTodayStr();

        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                if (habit.completedToday) {
                    // UNTICK: Revert progress
                    setXp(prev => Math.max(0, prev - 50)); 
                    return { ...habit, completedToday: false};
                } else {
                    // TICK: Add progress
                    setXp(prev => prev + 50);
                    return { ...habit, completedToday: true};
                }
            }
            return habit;
        });

        const anyCompletedNow = updatedHabits.some(h => h.completedToday);

        if (anyCompletedNow && lastActive !== today) {
            // First habit completed today! Streak goes up.
            setGlobalStreak(prev => prev + 1);
            setLastActive(today);
        } else if (!anyCompletedNow && lastActive === today) {
            // User unticked everything for today, revert the streak
            setGlobalStreak(prev => Math.max(0, prev - 1));
            setLastActive(''); 
        }

        setHabits(updatedHabits);
    };

    const addHabit = (title) => {
        const newHabit = { id: Date.now(), title, completedToday: false, streak: 0 };
        setHabits([...habits, newHabit]);
    };

    const resetForNextDay = () => {
        setHabits(habits.map(h => ({ ...h, completedToday: false })));
        alert("Simulated Next Day! All habits unticked.");
    };
    
    const currentLevel = getLevelData(xp);

    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center font-sans pb-24">
            <div className="w-full max-w-md p-6 relative">
                
                {/* Global Header */}
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-5">
                    <div>
                        <h1 className="text-xl font-bold text-emerald-400">Lvl {currentLevel.level}: {currentLevel.title}</h1>
                        <div className="flex items-center gap-2 mt-1 bg-slate-800 inline-flex px-3 py-1 rounded-full border border-slate-700">
                            <span className="text-orange-500 text-sm">🔥</span>
                            <span className="text-slate-200 text-sm font-bold">{globalStreak} Day Streak</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-white tracking-tight">{xp}</span>
                        <span className="text-emerald-500 text-xs ml-1 font-bold">XP</span>
                    </div>
                </div>

                {/* Tabs */}
                {activeTab === 'habits' && <Habits habits={habits} toggleHabit={toggleHabit} addHabit={addHabit} />}
                {activeTab === 'dashboard' && <Dashboard xp={xp} currentLevel={currentLevel} globalStreak={globalStreak} />}
                {activeTab === 'arena' && <Arena xp={xp} />}

                {/* Dev Mode Button (Remove before production) */}
                {activeTab === 'habits' && (
                    <button onClick={resetForNextDay} className="mt-8 w-full text-xs text-slate-500 underline text-center">
                        Dev Mode: Simulate Next Day
                    </button>
                )}

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-center p-4 z-50">
                    <div className="w-full max-w-md flex justify-around">
                        <button onClick={() => setActiveTab('habits')} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === 'habits' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'}`}>Quests</button>
                        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'}`}>Journey</button>
                        <button onClick={() => setActiveTab('arena')} className={`px-4 py-2 rounded-xl font-bold transition-all ${activeTab === 'arena' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'}`}>Arena</button>
                    </div>
                </div>

            </div>
        </div>
    );
}