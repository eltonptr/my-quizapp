const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionsContainer = document.getElementById('question-container');

const question = document.getElementById('questions');
const answers = document.getElementById('answer-buttons');

let randomQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', handleNextClick);

function handleNextClick() {
    currentQuestionIndex++;
    moveToNextQuestion();
}

function startQuiz() {
    // initialize
    currentQuestionIndex = 0;
    randomQuestions = sampleQuestions.sort(() => Math.random() - 0.5 );

    startButton.classList.add('hide');
    questionsContainer.classList.remove('hide');
    
    moveToNextQuestion();

}

function resetQA(){
    nextButton.classList.add('hide');
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild)
    }
}

function moveToNextQuestion() {
    resetQA();
    displayQuestion(randomQuestions[currentQuestionIndex]);
}

function displayQuestion(selectedQuestion) {
    question.innerText = selectedQuestion.question;
    selectedQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.option
        button.classList.add('btn')
        if(answer.isCorrect) {
            button.dataset.isCorrect = answer.isCorrect
        }
        button.addEventListener('click', selectAnswer)   
        answers.appendChild(button)   
    });
}

// TODO - assign all colors in one shot after clearing
function selectAnswer(e) {
    const selectedAnswer = e.target;
    const correct = selectedAnswer.dataset.isCorrect;
    setStatusClass(document.body, correct);
    Array.from(answers.children).forEach((node) => {
        setStatusClass(node, node.dataset.isCorrect)
    });
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(node, isCorrect) {
    clearStatusClass(node);
    if(isCorrect)
        node.classList.add('correct');
    else
        node.classList.add('wrong');
}

function clearStatusClass(node) {
    node.classList.remove('correct');
    node.classList.remove('wrong');
}

// Mock Data

const sampleQuestions = [
    {
        question: 'Can you choose biggest number?',
        answers: [
            {option: '0', isCorrect: false},
            {option: '10', isCorrect: true},
            {option: '4', isCorrect: false},
            {option: '5', isCorrect: false}
        ]
    },
    {
        question: 'C is the correct answer',
        answers: [
            {option: 'A', isCorrect: false},
            {option: 'B', isCorrect: false},
            {option: 'not C', isCorrect: false},
            {option: 'C', isCorrect: true}
        ]
    }
]