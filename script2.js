const questions = [
    {
        question: "Which of the following is the correct syntax for a single-line comment in C++?",
        answers: [
            { text: "/* comment */", correct: false },
            { text: "// comment", correct: true },
            { text: "# comment", correct: false },
            { text: "//comment//", correct: false },
        ]
    },
    {
        question: "Which of the following is used to dynamically allocate memory in C++?",
        answers: [
            { text: "new", correct: true },
            { text: "alloc()", correct: false },
            { text: "calloc()", correct: false },
            { text: "malloc()", correct: false },
        ]
    },
    {
        question: "Which of these is the correct way to declare a constant variable in C++?",
        answers: [
            { text: "constant int x = 10;", correct: false },
            { text: "int constant x = 10;", correct: false },
            { text: "final int x = 10;", correct: false },
            { text: "const int x = 10;", correct: true },
        ]
    },
    {
        question: "Which of the following is the correct syntax of a class in C++?",
        answers: [
            { text: "class_name class{};", correct: false },
            { text: "class class_name{};", correct: true },
            { text: "class_name class{}", correct: false },
            { text: "template (class T)", correct: false },
        ]
    },
    {
        question: "Which operator is overloaded by default in C++?",
        answers: [
            { text: "=", correct: true },
            { text: "+", correct: false },
            { text: "<<", correct: false },
            { text: "()", correct: false },
        ]
    },
    {
        question: "Which header file is required for input and output in C++?",
        answers: [
            { text: "conio.h", correct: false },
            { text: "iostream", correct: true },
            { text: "stdio.h", correct: false },
            { text: "stdlib.h", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a feature of OOP in C++?",
        answers: [
            { text: "Encapsulation", correct: false },
            { text: "Polymorphism", correct: false },
            { text: "Compilation", correct: true },
            { text: "Inheritance", correct: false },
        ]
    },
    {
        question: "What will sizeof(char) return in C++ (on most systems)?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "4", correct: false },
        ]
    },
    {
        question: "Which keyword is used to prevent a class from being inherited?",
        answers: [
            { text: "final", correct: true },
            { text: "private", correct: false },
            { text: "static", correct: false },
            { text: "sealed", correct: false },
        ]
    },
    {
        question: "Which of the following is true about destructors in C++?",
        answers: [
            { text: "Destructor can take arguments", correct: false },
            { text: "Destructor must return a value", correct: false },
            { text: "Destructor can be overloaded", correct: false },
            { text: "Destructor has the same name as the class with ~ prefix", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `🎉 You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
