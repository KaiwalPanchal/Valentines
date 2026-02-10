export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index
    successMessage: string;
}

export const quizData: QuizQuestion[] = [
    {
        id: 1,
        question: "Where were you on the night of February 14th last year?",
        options: ["Stealing hearts", "Eating pizza", "Asleep"],
        correctAnswer: 0,
        successMessage: "A likely story. But the evidence says otherwise."
    },
    {
        id: 2,
        question: "What is your primary weapon of choice?",
        options: ["Nunchucks", "Killer smile", "Sarcasm"],
        correctAnswer: 1,
        successMessage: "Deadly. We have photos to prove it."
    },
    {
        id: 3,
        question: "You are accused of being excessively cute. How do you plead?",
        options: ["Guilty", "Not Guilty", "I plead the 5th"],
        correctAnswer: 0,
        successMessage: "The jury notes your confession."
    },
    {
        id: 4,
        question: "Who is your partner in crime?",
        options: ["Stitch", "Kaiwal", "Batman"],
        correctAnswer: 1,
        successMessage: "We know he's the mastermind."
    },
    {
        id: 5,
        question: "Do you promise to be my Valentine forever?",
        options: ["Maybe", "YES!", "Only if there's food"],
        correctAnswer: 1,
        successMessage: "RECORDING ADMISSION... CONFESSION SECURED."
    }
];
