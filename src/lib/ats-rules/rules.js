export const atsRules = [
    {
        id: 'name-present',
        description: 'Le nom complet est présent',
        test: (cv) => !!cv.personalInfo.name.trim(),
        weight: 5
    },
    {
        id: 'email-present',
        description: 'L\'email est présent',
        test: (cv) => !!cv.personalInfo.email.trim(),
        weight: 5
    },
    {
        id: 'summary-length',
        description: 'Le résumé professionnel a entre 50 et 200 mots',
        test: (cv) => {
            const wordCount = cv.professionalSummary.split(/\s+/).filter(Boolean).length;
            return wordCount >= 50 && wordCount <= 200;
        },
        weight: 10
    },
    // Ajouter d'autres règles...
];

export function calculateATSScore(cv) {
    let totalScore = 0;
    let maxScore = 0;
    const results = [];
    
    atsRules.forEach(rule => {
        maxScore += rule.weight;
        const passed = rule.test(cv);
        if (passed) totalScore += rule.weight;
        results.push({
            ...rule,
            passed
        });
    });
    
    return {
        score: Math.round((totalScore / maxScore) * 100),
        results
    };
}