// src/components/Arena.jsx
export default function Arena({ xp }) {
    const MOCK_USERS = [
        { name: 'AlexTheGreat', xp: 620 },
        { name: 'SamuraiJack', xp: 450 },
        { name: 'CodeNinja', xp: 210 }
    ];

    const leaderboard = [...MOCK_USERS, { name: 'You', xp: xp }]
        .sort((a, b) => b.xp - a.xp);

    return (
        <div className="animate-fade-in bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h2 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4 flex justify-between">
                <span>Global Arena</span>
                <span className="text-emerald-500">Top 4</span>
            </h2>
            <div className="space-y-3">
                {leaderboard.map((user, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${user.name === 'You' ? 'bg-slate-700 border border-slate-500' : 'bg-slate-900/50'}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-500 font-bold w-4">{index + 1}.</span>
                            <span className={user.name === 'You' ? 'text-emerald-400 font-bold' : 'text-slate-200'}>{user.name}</span>
                        </div>
                        <span className="text-slate-400 text-sm font-mono">{user.xp} XP</span>
                    </div>
                ))}
            </div>
        </div>
    );
}