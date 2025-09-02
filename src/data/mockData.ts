export const mockStudyMaterials = [
  {
    id: 'math-1',
    title: 'Introduction to Algebra',
    type: 'notes' as const,
    subject: 'Math',
    content: `Introduction to Algebra

Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations.

Key Concepts:
- Variables: Letters that represent unknown numbers (like x, y, z)
- Constants: Numbers that don't change (like 5, 10, 100)
- Expressions: Combinations of variables and constants (like 2x + 5)
- Equations: Mathematical statements that show two expressions are equal (like 2x + 5 = 15)

Basic Operations:
1. Addition and Subtraction: Combine like terms
2. Multiplication: Distribute when needed
3. Division: Isolate variables

Example Problem:
Solve for x: 2x + 5 = 15
Step 1: Subtract 5 from both sides: 2x = 10
Step 2: Divide both sides by 2: x = 5

Practice makes perfect! Try solving similar problems to master these concepts.`,
    isBookmarked: false,
  },
  {
    id: 'math-2',
    title: 'Linear Equations Guide',
    type: 'pdf' as const,
    subject: 'Math',
    content: 'This PDF contains comprehensive examples and practice problems for linear equations.',
    isBookmarked: false,
  },
  {
    id: 'science-1',
    title: 'Photosynthesis Process',
    type: 'notes' as const,
    subject: 'Science',
    content: `Photosynthesis: The Process of Life

Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide.

The Equation:
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

Key Components:
- Chloroplasts: Where photosynthesis occurs
- Chlorophyll: The green pigment that captures light
- Stomata: Tiny pores that allow gas exchange

Two Main Stages:
1. Light-dependent reactions (in thylakoids)
2. Light-independent reactions (Calvin cycle in stroma)

Importance:
- Produces oxygen for all living things
- Creates glucose (food) for plants
- Forms the base of all food chains
- Removes carbon dioxide from atmosphere

Fun Fact: A large tree can produce enough oxygen for two people per day!`,
    isBookmarked: false,
  },
  {
    id: 'english-1',
    title: 'Grammar Fundamentals',
    type: 'notes' as const,
    subject: 'English',
    content: `English Grammar Fundamentals

Parts of Speech:
1. Nouns: Person, place, thing, or idea (cat, school, happiness)
2. Verbs: Action or state of being (run, is, think)
3. Adjectives: Describe nouns (big, beautiful, smart)
4. Adverbs: Describe verbs, adjectives, or other adverbs (quickly, very, well)
5. Pronouns: Replace nouns (he, she, it, they)
6. Prepositions: Show relationships (in, on, under, between)
7. Conjunctions: Connect words or phrases (and, but, or)
8. Interjections: Express emotion (wow, oh, alas)

Sentence Structure:
- Subject + Verb + Object (basic pattern)
- Example: "The cat (subject) caught (verb) the mouse (object)"

Common Grammar Rules:
- Subject-verb agreement
- Proper punctuation usage
- Correct tense consistency
- Clear pronoun references

Remember: Good grammar helps you communicate clearly and effectively!`,
    isBookmarked: false,
  },
];

export const mockQuizzes = [
  {
    id: 'math-quiz-1',
    title: 'Algebra Basics Quiz',
    subject: 'Math',
    questions: [
      {
        id: 'q1',
        question: 'What is the value of x in the equation: 2x + 6 = 14?',
        options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'],
        correctAnswer: 1,
        explanation: 'To solve 2x + 6 = 14: Subtract 6 from both sides to get 2x = 8, then divide by 2 to get x = 4.',
        isBookmarked: false,
      },
      {
        id: 'q2',
        question: 'Which of the following is a linear equation?',
        options: ['y = x²', 'y = 2x + 3', 'y = 1/x', 'y = x³'],
        correctAnswer: 1,
        explanation: 'A linear equation has variables with power 1 only. y = 2x + 3 is linear because both variables have power 1.',
        isBookmarked: false,
      },
      {
        id: 'q3',
        question: 'If 3x - 5 = 16, what is x?',
        options: ['x = 5', 'x = 7', 'x = 9', 'x = 11'],
        correctAnswer: 1,
        explanation: 'To solve 3x - 5 = 16: Add 5 to both sides to get 3x = 21, then divide by 3 to get x = 7.',
        isBookmarked: false,
      },
    ],
  },
  {
    id: 'science-quiz-1',
    title: 'Photosynthesis Quiz',
    subject: 'Science',
    questions: [
      {
        id: 'q4',
        question: 'What gas do plants absorb during photosynthesis?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 1,
        explanation: 'Plants absorb carbon dioxide (CO₂) from the air during photosynthesis and convert it into glucose.',
        isBookmarked: false,
      },
      {
        id: 'q5',
        question: 'Where does photosynthesis primarily occur in plants?',
        options: ['Roots', 'Stems', 'Leaves', 'Flowers'],
        correctAnswer: 2,
        explanation: 'Photosynthesis primarily occurs in the leaves, specifically in chloroplasts containing chlorophyll.',
        isBookmarked: false,
      },
    ],
  },
  {
    id: 'english-quiz-1',
    title: 'Grammar Basics Quiz',
    subject: 'English',
    questions: [
      {
        id: 'q6',
        question: 'Which word is a noun in this sentence: "The quick brown fox jumps"?',
        options: ['quick', 'brown', 'fox', 'jumps'],
        correctAnswer: 2,
        explanation: 'A noun is a person, place, thing, or idea. "Fox" is a thing (animal), making it a noun.',
        isBookmarked: false,
      },
      {
        id: 'q7',
        question: 'What type of word describes a verb?',
        options: ['Noun', 'Adjective', 'Adverb', 'Pronoun'],
        correctAnswer: 2,
        explanation: 'Adverbs describe verbs, adjectives, or other adverbs. They often end in -ly (quickly, slowly).',
        isBookmarked: false,
      },
    ],
  },
];