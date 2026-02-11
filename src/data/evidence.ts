export interface EvidenceItem {
    id: string;
    title: string;
    icon: string;
    log: string;
    rotation: number;
    top: string;
    left: string;
}

export const evidenceData: EvidenceItem[] = [
    {
        id: 'purple-heart',
        title: 'Purple Heart',
        icon: '💜',
        log: `EVIDENCE LOG #001
Subject's favorite color has mysteriously gained emotional significance.
Recent surveillance shows suspect buying purple items without explanation.
Conclusion: Color association with investigator confirmed.`,
        rotation: -5,
        top: '10%',
        left: '10%'
    },
    {
        id: 'law-book',
        title: 'Law Book',
        icon: '⚖️',
        log: `EVIDENCE LOG #002
Suspect overheard saying: "She's the smartest person I know."
Context: Discussing investigator's legal arguments.
Note: Said with suspiciously proud smile.
Conclusion: Intellectual admiration detected.`,
        rotation: 8,
        top: '15%',
        left: '60%'
    },
    {
        id: 'stitch',
        title: 'Stitch Plushie',
        icon: '🛸',
        log: `EVIDENCE LOG #003
Subject has developed unexpected attachment to blue alien characters.
Watches "Lilo & Stitch" despite no prior Disney habit.
Explanation given: "Ohana means family."
Conclusion: Suspect is stewwwpid (affectionate).`,
        rotation: -12,
        top: '40%',
        left: '20%'
    },
    {
        id: 'barbie',
        title: 'Barbie Reference',
        icon: '💅',
        log: `EVIDENCE LOG #004
Pinterest board activity shows unusual pink content.
Search history includes: "Barbie movie significance"
Theory: Attempting to understand investigator's interests.
Conclusion: Effort level = adorable.`,
        rotation: 15,
        top: '50%',
        left: '70%'
    },
    {
        id: 'ice-cream',
        title: 'Ice Cream',
        icon: '🍨',
        log: `EVIDENCE LOG #005
Life decisions now planned around dessert availability.
Quote: "Want to get ice cream?" (frequency: alarming)
Sweet tooth or excuse to spend time? Both.
Conclusion: Dessert = quality time = emotional attachment.`,
        rotation: 3,
        top: '70%',
        left: '10%'
    },
    {
        id: 'poetry',
        title: 'Poetry Journal',
        icon: '📖',
        log: `EVIDENCE LOG #006
Suspect plays Shankar Mahadevan's "Pyaar Ke Liye" on repeat.
Coincides with investigator's poetry-writing sessions.
Witness reports: "He smiles at nothing while listening."
Conclusion: May have inspired recent verses (unconfirmed).`,
        rotation: -8,
        top: '65%',
        left: '50%'
    },
    {
        id: 'music',
        title: 'Music Note',
        icon: '🎵',
        log: `EVIDENCE LOG #007
"Meri Kahani" - Atif Aslam
Shared playlist activity: excessive.
Both parties reported humming same song simultaneously.
Status: "Our song" (unofficial).
Conclusion: Musical emotional synchronization achieved.`,
        rotation: 10,
        top: '25%',
        left: '40%'
    },
    {
        id: 'car',
        title: 'Car Keys',
        icon: '🚗',
        log: `EVIDENCE LOG #008
Vehicle transformed into mobile therapy session.
Long drives documented at: riverfront, temple route, late nights.
Signature move: arm around investigator (frequency: constant).
Conclusion: Car = safe space = emotional breakthrough location.`,
        rotation: -15,
        top: '80%',
        left: '75%'
    }
];
