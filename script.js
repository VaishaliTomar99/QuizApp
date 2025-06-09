const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Saturn", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who invented the lightbulb?",
    options: ["Newton", "Einstein", "Edison", "Tesla"],
    answer: "Edison"
  },
  {
    question: "Which is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "HyperText Markdown Language", "None"],
    answer: "HyperText Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = q.question;
  document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  document.getElementById('live-score').textContent = `Score: ${score}`;
  
  const optionsList = document.getElementById('options');
  optionsList.innerHTML = '';
  
  q.options.forEach(option => {
    const li = document.createElement('li');
    li.innerHTML = `<button onclick="selectOption(this, '${option}')" class="option-btn w-full bg-gray-100 px-4 py-2 rounded-xl text-left font-medium hover:bg-gray-200 transition">${option}</button>`;
    optionsList.appendChild(li);
  });
}

function selectOption(btn, selected) {
  const correctAnswer = questions[currentQuestion].answer;
  const allOptions = document.querySelectorAll('.option-btn');
  allOptions.forEach(b => b.disabled = true);

  if (selected === correctAnswer) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    allOptions.forEach(b => {
      if (b.textContent === correctAnswer) b.classList.add('correct');
    });
  }

  document.getElementById('live-score').textContent = `Score: ${score}`;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('final-score').textContent = `You got ${score} out of ${questions.length}!`;
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quiz').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  showQuestion();
}

showQuestion();
