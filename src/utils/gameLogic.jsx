export const LEVEL_THRESHOLDS = [
    { level: 1, title: 'Novice', xpRequired: 0, nextAt: 100 },
    { level: 2, title: 'Apprentice', xpRequired: 100, nextAt: 300 },
    { level: 3, title: 'Challenger', xpRequired: 300, nextAt: 600 },
    { level: 4, title: 'Warrior', xpRequired: 600, nextAt: 1000 },
    { level: 5, title: 'Elite', xpRequired: 1000, nextAt: 1500 },
    { level: 6, title: 'Elite', xpRequired: 1500, nextAt: 2100 },
    { level: 7, title: 'Elite', xpRequired: 2100, nextAt: 2800 },
];

export const getLevelData = (xp) => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i].xpRequired) return LEVEL_THRESHOLDS[i];
    }
    return LEVEL_THRESHOLDS[0];
};