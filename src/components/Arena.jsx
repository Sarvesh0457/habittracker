export default function Arena({ xp }) {
    const MOCK_USERS = [
        { name: 'AlexTheGreat', xp: 620 },
        { name: 'SamuraiJack', xp: 450 },
        { name: 'CodeNinja', xp: 210 }
    ];

    const leaderboard = [...MOCK_USERS, { name: 'You', xp: xp }]
        .sort((a, b) => b.xp - a.xp);

    return (
        <div className="animate-fade-in bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5 flex justify-between">
                <span>Global Arena</span>
                <span className="text-indigo-600">Top 4</span>
            </h2>
            <div className="space-y-3">
                {leaderboard.map((user, index) => (
                    <div key={index} className={`flex justify-between items-center p-4 rounded-2xl transition-all ${user.name === 'You' ? 'bg-indigo-50 border border-indigo-200 shadow-sm' : 'bg-slate-50 border border-slate-100'}`}>
                        <div className="flex items-center gap-4">
                            <span className={`font-black w-5 text-center ${user.name === 'You' ? 'text-indigo-500' : 'text-slate-400'}`}>{index + 1}.</span>
                            <span className={`font-bold text-lg ${user.name === 'You' ? 'text-indigo-700' : 'text-slate-700'}`}>{user.name}</span>
                        </div>
                        <span className={`text-sm font-black font-mono ${user.name === 'You' ? 'text-indigo-600' : 'text-slate-500'}`}>{user.xp} XP</span>
                    </div>
                ))}
            </div>
        </div>
    );
}