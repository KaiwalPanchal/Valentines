export interface EvidenceItem {
    id: string;
    title: string;
    description: string;
    icon: string; // Emoji or asset path
    rotation: number;
    top: string;
    left: string;
}

export const evidenceData: EvidenceItem[] = [
    {
        id: 'receipt',
        title: 'Cafe Receipt',
        description: 'Order: 2 Hot Chocolates. Location: The Date Spot. Date: Feb 14?',
        icon: '🧾',
        rotation: -5,
        top: '10%',
        left: '10%'
    },
    {
        id: 'ticket',
        title: 'Movie Ticket',
        description: 'Admit One. "Rom-Com Marathon". Suspect was seen crying.',
        icon: '🎟️',
        rotation: 8,
        top: '15%',
        left: '60%'
    },
    {
        id: 'photo',
        title: 'Blurry Photo',
        description: 'Suspect caught looking aggressively cute.',
        icon: '📷',
        rotation: -12,
        top: '40%',
        left: '20%'
    },
    {
        id: 'lipstick',
        title: 'Lipstick Mark',
        description: 'Shade: "Heartbreaker Red". Found on a napkin.',
        icon: '💋',
        rotation: 15,
        top: '50%',
        left: '70%'
    },
    {
        id: 'text',
        title: 'Text Log',
        description: 'Msg: "I miss you" sent at 2 AM. Suspicious behavior.',
        icon: '📱',
        rotation: 3,
        top: '70%',
        left: '10%'
    },
    {
        id: 'gift',
        title: 'Wrapped Box',
        description: 'Contains chocolate? Or a bomb (of love)?',
        icon: '🎁',
        rotation: -8,
        top: '65%',
        left: '50%'
    },
    {
        id: 'perfume',
        title: 'Scent Trace',
        description: 'Smells like vanilla and trouble.',
        icon: '🌸',
        rotation: 10,
        top: '25%',
        left: '40%'
    },
    {
        id: 'bear',
        title: 'Teddy Bear',
        description: 'Possession of stolen cuddles.',
        icon: '🧸',
        rotation: -15,
        top: '80%',
        left: '75%'
    }
];
