export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index
    correctResponse: string;
    wrongResponse: string;
}

export const quizData: QuizQuestion[] = [
    {
        id: 1,
        question: "When did the suspect first realize he liked the investigator?",
        options: [
            "At Navratri when she came back the second day",
            "During long drives with his arm around her",
            "At the riverfront confession",
            "The moment is classified (he's still processing)"
        ],
        correctAnswer: 3,
        correctResponse: "✓ CORRECT\nThe suspect admits: some feelings don't have clean timestamps.\nThey just... are.",
        wrongResponse: "❌ Nice try, counselor.\nThe suspect's timeline remains... complicated."
    },
    {
        id: 2,
        question: "What crime is the suspect MOST guilty of?",
        options: [
            "Excessive smiling at phone notifications",
            "Daydreaming during important meetings",
            "Believing \"things will fall into place\"",
            "All of the above, your honor"
        ],
        correctAnswer: 3,
        correctResponse: "✓ GUILTY AS CHARGED\nThe suspect offers no defense.\nQuote: \"What else will you do if not believe?\"\n(Note: He's using her own words against the court.)",
        wrongResponse: "❌ Think bigger, counselor. The charges are... extensive."
    },
    {
        id: 3,
        question: "The suspect's most incriminating evidence includes:",
        options: [
            "Listening to Atif Aslam until the neighbors complain",
            "Planning his week around paneer chilly availability",
            "Becoming emotionally attached to the color purple",
            "All items submitted as Exhibit A, B, and C"
        ],
        correctAnswer: 3,
        correctResponse: "✓ EVIDENCE ACCEPTED\nThe court notes: suspect shows no remorse.\nIn fact, he seems... proud?\nInvestigator's influence: undeniable.",
        wrongResponse: "❌ The evidence is overwhelming. Consider ALL exhibits."
    },
    {
        id: 4,
        question: "How would the suspect describe his current emotional state?",
        options: [
            "Professionally composed",
            "Logically sound",
            "Stewwwpidly in love",
            "Maintaining plausible deniability"
        ],
        correctAnswer: 2,
        correctResponse: "✓ CONFESSION RECORDED\nSuspect's exact words: \"Stewwwpidly in love.\"\n(Pronunciation noted: influenced by investigator's accent.)\nCourt's reaction: adorable.",
        wrongResponse: "❌ The suspect's composure has long since crumbled."
    },
    {
        id: 5,
        question: "The suspect's primary defense strategy is:",
        options: [
            "Blame the Navratri magic",
            "Cite the temple proposal legacy (external influence)",
            "Reference the Takshashila comfort doctrine",
            "Plead hopelessly, completely, entirely guilty"
        ],
        correctAnswer: 3,
        correctResponse: "✓ PLEA ENTERED\nThe suspect offers no defense.\nNo justification.\nNo logical argument.\n\nJust this: he's in love with the investigator.\n\nProceeding to final evidence...",
        wrongResponse: "❌ The suspect has no defense. None at all."
    }
];
