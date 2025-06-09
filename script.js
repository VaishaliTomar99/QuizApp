
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Berlin", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web styling?",
        options: ["HTML", "CSS", "Python", "JavaScript"],
        answer: "CSS"
    },
    {
        question: "What is JS short for?",
        options: ["Java Syntax", "JustScript", "JavaScript", "JScript"],
        answer: "JavaScript"
    },
    {
        question: "What color does Tailwind use for 'bg-blue-500'?",
        options: ["Light Blue", "Royal Blue", "Medium Blue", "Sky Blue"],
        answer: "Medium Blue"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

function showQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    document.getElementById('q-count').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';

    // Render options
    questionData.options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="option-btn w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-left font-medium transition" onclick="selectOption(this, '${option}')">${option}</button>`;
        optionsList.appendChild(li);
    });

    // Reset timer and progress bar
    timeLeft = 10;
    document.getElementById('timer').textContent = `⏳ Time: ${timeLeft}`;
    document.getElementById('progress-bar').style.width = '0%';
    animateProgressBar();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Function to animate the progress bar
function animateProgressBar() {
    const bar = document.getElementById('progress-bar');
    let width = 0;
    const interval = setInterval(() => {
        if (width < 100) {
            width++;
            bar.style.width = `${width}%`;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Timer countdown
function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `⏳ Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
    }
}

// Function to handle option selection
function selectOption(button, selected) {
    const correct = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
        allOptions.forEach(btn => {
            if (btn.textContent === correct) btn.classList.add("correct");
        });
    }

    clearInterval(timer);
    setTimeout(nextQuestion, 1000);
}

// Function to load the next question or show results
function nextQuestion() {
    clearInterval(timer);
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById('quiz-box').style.display = 'none';
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('score-text').textContent = `You scored ${score}/${questions.length}. ${score === questions.length ? 'Perfect! 🏆' : score > 2 ? 'Nice! 👍' : 'Try again! 🤓'}`;
    }
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('quiz-box').style.display = 'block';
    showQuestion();
}

showQuestion();
