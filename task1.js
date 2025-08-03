const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<head>", "<h1>", "<h6>", "<header>"],
    answer: "<h1>"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Google", "Microsoft", "IBM"],
    answer: "Netscape"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.onclick = () => handleAnswer(btn, option);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(button, selectedAnswer) {
  const current = questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(btn => btn.disabled = true);

  if (selectedAnswer === current.answer) {
    button.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${current.answer}`;
    allButtons.forEach(btn => {
      if (btn.textContent === current.answer) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.style.display = "inline-block";
  scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  scoreDisplay.textContent = `Final Score: ${score} / ${questions.length}`;
}

// Start the quiz
loadQuestion();
