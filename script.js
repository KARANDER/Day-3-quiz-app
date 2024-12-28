const questions = [
    {
        question: "Which is largest animal in world? ",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue Whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world by land area? ",
        answers: [
            { Text: "Europe", correct: false },
            { Text: "South America", correct: false },
            { Text: "Antarctica", correct: false },
            { Text: "Australia", correct: true },
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'? ",
        answers: [
            { Text: "Venus", correct: false },
            { Text: "Jupiter", correct: false },
            { Text: "Mars", correct: true },
            { Text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the hardest natural substance on Earth? ",
        answers: [
            { Text: "Gold", correct: false },
            { Text: "Diamond", correct: true },
            { Text: "Iron", correct: false },
            { Text: "Quartz", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");


let currentQuestionindex = 0;
let score = 0;
function startQuize() {
    currentQuestionindex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();

}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.Text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct

        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");

    }

    Array.from(ansBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");

        }
        button.disabled = true;

    });
    nextBtn.style.display = "block";

}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored  ${score} out of${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = " block";

}
function handaleNextButton() {
    currentQuestionindex++;
    if (currentQuestionindex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextBtn.addEventListener("click", () => {
    if (currentQuestionindex < questions.length) {
        handaleNextButton();

    } else {
        startQuize();
    }
})


startQuize();