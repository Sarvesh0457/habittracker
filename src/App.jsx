import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Habits from './components/Habits';
import Dashboard from './components/Dashboard';
import Arena from './components/Arena';
import { getLevelData } from './utils/gameLogic';

const getTodayStr = () => new Date().toLocaleDateString('en-CA');

const playSuccessSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play blocked by browser:", e));
};

export default function App() {
    const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('habits')) || []);
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp')) || 0);
    const [globalStreak, setGlobalStreak] = useState(() => parseInt(localStorage.getItem('globalStreak')) || 0);
    const [lastActive, setLastActive] = useState(() => localStorage.getItem('lastActive') || '');
    const [activeTab, setActiveTab] = useState('habits');    
    // 🌟 NEW: State to control the Level Up Alert
    const [showLevelAlert, setShowLevelAlert] = useState(false);

    const currentLevel = getLevelData(xp);
    const prevLevelRef = useRef(currentLevel.level);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
        localStorage.setItem('xp', xp.toString());
        localStorage.setItem('globalStreak', globalStreak.toString());
        localStorage.setItem('lastActive', lastActive);
    }, [habits, xp, globalStreak, lastActive]);

    useEffect(() => {
        if (currentLevel.level > prevLevelRef.current) {
            // 1. Fire Confetti
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#4f46e5', '#8b5cf6', '#38bdf8'] 
            });
            
            // 2. Show Smooth Alert
            setShowLevelAlert(true);
            
            // 3. Hide Alert after 4 seconds
            setTimeout(() => {
                setShowLevelAlert(false);
            }, 4000);
        }
        prevLevelRef.current = currentLevel.level;
    }, [currentLevel.level]);

    const toggleHabit = (id) => {
        const today = getTodayStr();
        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                const isCompleting = !habit.completedToday;
                setXp(prev => Math.max(0, prev + (isCompleting ? 50 : -50)));
                if (isCompleting) playSuccessSound();
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

    // 🗑️ NEW: Delete Function
    const deleteHabit = (id) => {
        if (window.confirm("Abandon this protocol?")) {
            setHabits(habits.filter(h => h.id !== id));
        }
    };

    // 🛠️ DEV TOOLS & DEMO DATA
    const resetForNextDay = () => {
        setHabits(habits.map(h => ({ ...h, completedToday: false })));
        alert("Simulated Next Day! All habits unticked.");
    };

    const hardReset = () => {
        if (window.confirm("⚠️ Wipe all data and start over?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const loadDemoData = () => {
        if (window.confirm("📊 Inject Level 4 Demo Profile for presentation?")) {
            const today = getTodayStr();
            setHabits([
                { id: 1, title: "Drink 2L Water", completedToday: true },
                { id: 2, title: "Code for 1 Hour", completedToday: true },
                { id: 3, title: "Read 10 Pages", completedToday: false }
            ]);
            setXp(650);
            setGlobalStreak(12);
            setLastActive(today);
            alert("Demo profile loaded!");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-200 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px]">
            
            {/* 🌟 NEW: SMOOTH LEVEL UP ALERT */}
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${showLevelAlert ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-90 pointer-events-none'}`}>
                <div className="bg-white/95 backdrop-blur-xl border-2 border-indigo-500 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(99,102,241,0.3)] flex items-center gap-5">
                    <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-100">
                        <span className="text-2xl animate-bounce">🏆</span>
                    </div>
                    <div>
                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-0.5">Achievement Unlocked</p>
                        <p className="text-xl font-black text-slate-900">Level {currentLevel.level}: {currentLevel.title}</p>
                    </div>
                </div>
            </div>
            {/* 🌟 END ALERT */}

            <div className="max-w-2xl mx-auto w-full min-h-screen flex flex-col relative px-5 sm:px-0 pt-12 pb-32">
                
                {/* Header */}
                <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-200">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-500 tracking-wider">SYSTEM ONLINE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
                            Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">{currentLevel.level}</span>
                        </h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{currentLevel.title}</p>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg shadow-sm">
                            <span className="text-orange-500 text-sm">🔥</span>
                            <span className="text-orange-600 font-mono text-sm font-black">{globalStreak} <span className="text-orange-400">DAYS</span></span>
                        </div>
                        <div className="text-4xl font-black tracking-tighter text-slate-900">
                            {xp} <span className="text-indigo-500 text-base font-bold uppercase tracking-widest">XP</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full z-10">
                    {activeTab === 'habits' && <Habits habits={habits} toggleHabit={toggleHabit} addHabit={addHabit} deleteHabit={deleteHabit} />}
                    {activeTab === 'dashboard' && <Dashboard xp={xp} currentLevel={currentLevel} globalStreak={globalStreak} />}
                    {activeTab === 'arena' && <Arena xp={xp} />}

                    {/* DEV / DEMO TOOLS MENU */}
                    {activeTab === 'habits' && (
                        <div className="mt-12 p-4 bg-slate-100 border border-slate-200 rounded-2xl flex flex-wrap gap-3 justify-center">
                            <p className="w-full text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Developer Controls</p>
                            <button onClick={resetForNextDay} className="active:scale-95 text-xs text-slate-600 bg-white hover:bg-slate-50 py-2 px-4 rounded-lg border border-slate-200 font-medium transition-all shadow-sm">
                                Skip to Next Day
                            </button>
                            <button onClick={loadDemoData} className="active:scale-95 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 px-4 rounded-lg border border-indigo-200 font-bold transition-all shadow-sm">
                                Load Demo User
                            </button>
                            <button onClick={hardReset} className="active:scale-95 text-xs text-red-600 bg-red-50 hover:bg-red-100 py-2 px-4 rounded-lg border border-red-200 font-bold transition-all shadow-sm">
                                Factory Reset
                            </button>
                        </div>
                    )}
                </div>

                {/* LIGHT DOCK: Indigo Theme */}
                <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50 px-4">
                    <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 p-2 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                        {[
                            { id: 'habits', icon: '⌘', label: 'Quests' },
                            { id: 'dashboard', icon: '∆', label: 'Journey' },
                            { id: 'arena', icon: '⍟', label: 'Arena' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}>
                                <span className={`text-lg ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.icon}</span>
                                <span className="text-sm tracking-wide">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}