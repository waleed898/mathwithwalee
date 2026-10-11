// MathWithWalee website settings
// Replace YOUR_CHANNEL_URL with your actual YouTube channel URL.
// Optional: replace FEATURED_VIDEO_ID with a YouTube video ID to embed a video.
const YOUR_CHANNEL_URL = "https://www.youtube.com/@MathWithWalee-ev3";
const FEATURED_VIDEO_ID = "XbKc4or8bNY";

document.getElementById("year").textContent = new Date().getFullYear();
const youtubeLink = document.getElementById("youtubeLink");
youtubeLink.href = YOUR_CHANNEL_URL;"https://www.youtube.com/@MathWithWalee-ev3";

if (FEATURED_VIDEO_ID.trim()) {
  const placeholder = document.querySelector(".video-placeholder");
  placeholder.innerHTML = `<iframe title="Featured MathWithWalee video" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(FEATURED_VIDEO_ID)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  placeholder.classList.add("embedded-video");
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const questions = [
  {q:"What is 24 + 19?", options:["33","43","53","42"], answer:1, explain:"24 + 19 = 24 + 20 − 1 = 43."},
  {q:"What is 9 × 7?", options:["56","63","72","49"], answer:1, explain:"9 groups of 7 make 63."},
  {q:"What is 84 ÷ 4?", options:["18","20","21","24"], answer:2, explain:"4 × 21 = 84, so 84 ÷ 4 = 21."},
  {q:"What is 100 − 37?", options:["73","63","67","53"], answer:1, explain:"100 − 30 = 70, then 70 − 7 = 63."},
  {q:"What is 12 × 6?", options:["62","72","68","84"], answer:1, explain:"12 × 6 = 72."}
];
let currentQuestion = 0, score = 0, answered = false;
const questionText = document.getElementById("questionText");
const questionCounter = document.getElementById("questionCounter");
const answerOptions = document.getElementById("answerOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const progressBar = document.getElementById("progressBar");
const scoreValue = document.getElementById("scoreValue");
const scoreMessage = document.getElementById("scoreMessage");

function renderQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  questionCounter.textContent = `QUESTION ${currentQuestion + 1} / ${questions.length}`;
  questionText.textContent = item.q;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  quizFeedback.textContent = "Choose an answer to begin.";
  quizFeedback.className = "quiz-feedback";
  answerOptions.innerHTML = "";
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}.  ${option}`;
    button.addEventListener("click", () => chooseAnswer(index));
    answerOptions.appendChild(button);
  });
  nextQuestion.disabled = true;
  nextQuestion.textContent = currentQuestion === questions.length - 1 ? "See results →" : "Next question →";
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...answerOptions.querySelectorAll("button")];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === item.answer) button.classList.add("correct");
    if (i === index && index !== item.answer) button.classList.add("incorrect");
  });
  if (index === item.answer) {
    score++;
    quizFeedback.textContent = `Correct! ${item.explain}`;
    quizFeedback.className = "quiz-feedback good";
  } else {
    quizFeedback.textContent = `Not quite. ${item.explain}`;
    quizFeedback.className = "quiz-feedback bad";
  }
  scoreValue.textContent = score;
  scoreMessage.textContent = score === questions.length ? "Perfect score — brilliant work!" : "Keep going. Every question helps you improve.";
  nextQuestion.disabled = false;
}
nextQuestion.addEventListener("click", () => {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    questionText.textContent = `Quiz complete — you scored ${score} out of ${questions.length}!`;
    questionCounter.textContent = "RESULTS";
    answerOptions.innerHTML = "";
    progressBar.style.width = "100%";
    quizFeedback.textContent = score === 5 ? "Amazing! You got every question right." : "Great practice! Restart and see if you can beat your score.";
    quizFeedback.className = "quiz-feedback good";
    nextQuestion.textContent = "Play again ↻";
    nextQuestion.disabled = false;
    nextQuestion.onclick = () => {
      currentQuestion = 0; score = 0; scoreValue.textContent = "0";
      scoreMessage.textContent = "Every question is a chance to learn.";
      nextQuestion.onclick = null;
      renderQuestion();
    };
  }
});
document.getElementById("restartQuiz").addEventListener("click", () => {
  currentQuestion = 0; score = 0; scoreValue.textContent = "0";
  scoreMessage.textContent = "Every question is a chance to learn.";
  nextQuestion.onclick = null;
  renderQuestion();
});
renderQuestion();

const challengeAnswer = document.getElementById("challengeAnswer");
const challengeFeedback = document.getElementById("challengeFeedback");
function checkChallenge() {
  if (challengeAnswer.value.trim() === "") {
    challengeFeedback.textContent = "Enter a number first.";
    challengeFeedback.style.color = "var(--muted)";
    return;
  }
  if (Number(challengeAnswer.value) === 7) {
    challengeFeedback.textContent = "Correct! Double 7 is 14, and 14 + 6 = 20. Nice work!";
    challengeFeedback.style.color = "var(--green)";
  } else {
    challengeFeedback.textContent = "Not yet — work backwards: subtract 6 from 20, then divide by 2.";
    challengeFeedback.style.color = "#ff9ba5";
  }
}
document.getElementById("checkChallenge").addEventListener("click", checkChallenge);
challengeAnswer.addEventListener("keydown", e => { if (e.key === "Enter") checkChallenge(); });
document.getElementById("revealChallenge").addEventListener("click", () => {
  challengeFeedback.textContent = "Answer: 7, because 2 × 7 + 6 = 20.";
  challengeFeedback.style.color = "var(--green)";
});

const tableSelect = document.getElementById("tableSelect");
for (let n = 2; n <= 15; n++) {
  const option = document.createElement("option");
  option.value = n; option.textContent = `Table of ${n}`;
  if (n === 7) option.selected = true;
  tableSelect.appendChild(option);
}
function showTable() {
  const n = Number(tableSelect.value);
  const results = document.getElementById("tableResults");
  results.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const item = document.createElement("div");
    item.className = "table-item";
    item.innerHTML = `${n} × ${i} = <b>${n * i}</b>`;
    results.appendChild(item);
  }
}
document.getElementById("showTable").addEventListener("click", showTable);
document.getElementById("randomTable").addEventListener("click", () => {
  const n = Math.floor(Math.random() * 14) + 2;
  tableSelect.value = String(n);
  showTable();
});
showTable();

/* NEW FEATURE: Practice More Questions */

const practiceTopic = document.getElementById("practiceTopic");
const practiceDifficulty = document.getElementById("practiceDifficulty");
const generatePractice = document.getElementById("generatePractice");
const practiceQuestions = document.getElementById("practiceQuestions");
const practiceScore = document.getElementById("practiceScore");

let practiceItems = [];
let practiceCorrect = 0;
let practiceAnswered = 0;

function makePracticeQuestions() {
  const selectedTopic = practiceTopic.value;
  const difficulty = practiceDifficulty.value;
  const operations = selectedTopic === "mixed"
    ? ["addition", "subtraction", "multiplication", "division"]
    : [selectedTopic];

  const min = difficulty === "easy" ? 1 : difficulty === "medium" ? 10 : 100;
  const max = difficulty === "easy" ? 12 : difficulty === "medium" ? 99 : 999;

  practiceItems = Array.from({ length: 5 }, () => {
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 100)) + 1;
    let symbol, answer;

    if (op === "addition") {
      symbol = "+";
      answer = a + b;
    } else if (op === "subtraction") {
      symbol = "−";
      if (b > a) [a, b] = [b, a];
      answer = a - b;
    } else if (op === "multiplication") {
      symbol = "×";
      a = Math.floor(Math.random() * (difficulty === "easy" ? 12 : difficulty === "medium" ? 30 : 100)) + 1;
      answer = a * b;
    } else {
      symbol = "÷";
      answer = Math.floor(Math.random() * (difficulty === "easy" ? 12 : difficulty === "medium" ? 30 : 100)) + 1;
      a = answer * b;
    }

    return { a, b, symbol, answer, done: false };
  });

  practiceCorrect = 0;
  practiceAnswered = 0;
  renderPracticeQuestions();
}

function renderPracticeQuestions() {
  practiceQuestions.innerHTML = "";

  practiceItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "practice-question";

    const heading = document.createElement("h3");
    heading.textContent = `Question ${index + 1}: ${item.a} ${item.symbol} ${item.b} = ?`;

    const input = document.createElement("input");
    input.type = "number";
    input.className = "practice-answer";
    input.placeholder = "Type your answer";
    input.setAttribute("aria-label", `Answer for question ${index + 1}`);

    const check = document.createElement("button");
    check.type = "button";
    check.className = "challenge-btn";
    check.textContent = "Check Answer";

    const feedback = document.createElement("p");
    feedback.className = "practice-feedback";
    feedback.setAttribute("aria-live", "polite");

    check.addEventListener("click", () => {
      if (item.done) return;

      if (input.value.trim() === "") {
        feedback.textContent = "Enter your answer first.";
        return;
      }

      item.done = true;
      practiceAnswered++;

      if (Number(input.value) === item.answer) {
        practiceCorrect++;
        feedback.textContent = "Correct! Great work! ✓";
      } else {
        feedback.textContent = `Not quite. The correct answer is ${item.answer}.`;
      }

      input.disabled = true;
      check.disabled = true;
      practiceScore.textContent =
        `Score: ${practiceCorrect}/${practiceAnswered} answered · ${practiceItems.length - practiceAnswered} remaining`;

      if (practiceAnswered === practiceItems.length) {
        practiceScore.textContent =
          `Finished! You scored ${practiceCorrect} out of ${practiceItems.length}. Generate another set to practise again!`;
      }
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") check.click();
    });

    card.append(heading, input, check, feedback);
    practiceQuestions.appendChild(card);
  });

  practiceScore.textContent = "New questions ready! Answer all five to see your score.";
}

generatePractice.addEventListener("click", makePracticeQuestions);
makePracticeQuestions();
