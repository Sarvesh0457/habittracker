import { useState, useEffect } from 'react';
import Habits from './components/Habits';
import Dashboard from './components/Dashboard';
import Arena from './components/Arena';
import { getLevelData } from './utils/gameLogic';

export default function App() {
    const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('habits')) || []);
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp')) || 0);
    const [activeTab, setActiveTab] = useState('habits');

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
        localStorage.setItem('xp', xp.toString());
    }, [habits, xp]);

    // The Untick Logic Fix
    const toggleHabit = (id) => {
        setHabits(habits.map(habit => {
            if (habit.id === id) {
                if (habit.completedToday) {
                    // UNTICK: Revert progress
                    setXp(prev => Math.max(0, prev - 50)); 
                    return { ...habit, completedToday: false, streak: Math.max(0, habit.streak - 1) };
                } else {
                    // TICK: Add progress
                    setXp(prev => prev + 50);
                    return { ...habit, completedToday: true, streak: habit.streak + 1 };
                }
            }
            return habit;
        }));
    };

    const addHabit = (title) => {
        const newHabit = { id: Date.now(), title, completedToday: false, streak: 0 };
        setHabits([...habits, newHabit]);
    };

    const currentLevel = getLevelData(xp);

    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center font-sans pb-20">
            <div className="w-full max-w-md p-6">
                
                {/* Global Header (Always Visible) */}
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                    <div>
                        <h1 className="text-xl font-bold text-emerald-400">Lvl {currentLevel.level}: {currentLevel.title}</h1>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold">{xp}</span><span className="text-slate-400 text-xs ml-1">XP</span>
                    </div>
                </div>

                {/* Tab Rendering Logic */}
                {activeTab === 'habits' && <Habits habits={habits} toggleHabit={toggleHabit} addHabit={addHabit} />}
                {activeTab === 'dashboard' && <Dashboard xp={xp} currentLevel={currentLevel} />}
                {activeTab === 'arena' && <Arena xp={xp} />}

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-center p-4">
                    <div className="w-full max-w-md flex justify-around">
                        <button onClick={() => setActiveTab('habits')} className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'habits' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Quests</button>
                        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Journey</button>
                        <button onClick={() => setActiveTab('arena')} className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'arena' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>Arena</button>
                    </div>
                </div>

            </div>
        </div>
    );
}