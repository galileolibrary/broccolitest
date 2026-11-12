/* ============================================================
   KAHOOT-STYLE TRIVIA GAME
   The questions live in questions.js — edit them there!
   ============================================================ */

const SECONDS_PER_QUESTION = 20;
const SHAPES = ["▲", "◆", "●", "■"];

let currentQuizKey = null;
let questionIndex = 0;
let score = 0;
let correctCount = 0;
let timeLeft = 0;
let timerId = null;
let questionStartTime = 0;

const $ = (id) => document.getElementById(id);

/* ----- Show the quiz cards to pick from ----- */
function showPicker() {
  $("game").classList.remove("show");
  $("results").classList.remove("show");
  $("picker").style.display = "";
  $("picker").innerHTML = "";

  for (const key in QUIZZES) {
    const quiz = QUIZZES[key];
    const card = document.createElement("div");
    card.className = "window";
    card.innerHTML = `
      <div class="window-bar">${quiz.questions.length} questions <span class="dots"></span></div>
      <div class="window-body center">
        <div style="font-size:4rem">${quiz.emoji}</div>
        <h2>${quiz.title}</h2>
        <p>${quiz.blurb}</p>
        <button class="btn pink">▶ Play!</button>
      </div>`;
    card.querySelector("button").onclick = () => startQuiz(key);
    $("picker").appendChild(card);
  }
}

/* ----- Start a quiz ----- */
function startQuiz(key) {
  currentQuizKey = key;
  questionIndex = 0;
  score = 0;
  correctCount = 0;
  $("picker").style.display = "none";
  $("results").classList.remove("show");
  $("game").classList.add("show");
  showQuestion();
}

/* ----- Show one question ----- */
function showQuestion() {
  const quiz = QUIZZES[currentQuizKey];
  const q = quiz.questions[questionIndex];

  $("qNumber").textContent = `Question ${questionIndex + 1} of ${quiz.questions.length}`;
  $("score").textContent = `Score: ${score}`;
  $("qText").textContent = q.question;
  $("feedback").className = "feedback";

  // The picture: a photo if there is one, otherwise the emoji
  const pic = $("qPicture");
  pic.innerHTML = "";
  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = q.question;
    img.onerror = () => {
      pic.innerHTML = `<div class="photo-placeholder"><b>📷</b>Photo coming soon!<br><small>${q.image}</small></div>`;
    };
    pic.appendChild(img);
  } else {
    pic.textContent = q.emoji || "🥦";
  }

  // The answer buttons
  const box = $("answers");
  box.innerHTML = "";
  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.className = "answer c" + i;
    btn.innerHTML = `<span class="shape">${SHAPES[i]}</span><span></span>`;
    btn.lastChild.textContent = answer;
    btn.onclick = () => pickAnswer(answer, btn);
    box.appendChild(btn);
  });

  startTimer();
}

/* ----- The countdown timer ----- */
function startTimer() {
  clearInterval(timerId);
  timeLeft = SECONDS_PER_QUESTION;
  questionStartTime = Date.now();
  updateTimer();
  timerId = setInterval(() => {
    const elapsed = (Date.now() - questionStartTime) / 1000;
    timeLeft = Math.max(0, SECONDS_PER_QUESTION - elapsed);
    updateTimer();
    if (timeLeft <= 0) pickAnswer(null, null); // ran out of time!
  }, 100);
}

function updateTimer() {
  $("timerNum").textContent = Math.ceil(timeLeft);
  $("timerBar").style.width = (timeLeft / SECONDS_PER_QUESTION) * 100 + "%";
}

/* ----- When someone picks an answer (or time runs out) ----- */
function pickAnswer(answer, clickedButton) {
  clearInterval(timerId);
  const q = QUIZZES[currentQuizKey].questions[questionIndex];
  const isRight = answer === q.correct;

  // Faster answers get more points (500 to 1000), like Kahoot
  let points = 0;
  if (isRight) {
    points = Math.round(500 + 500 * (timeLeft / SECONDS_PER_QUESTION));
    score += points;
    correctCount++;
  }

  // Fade the wrong buttons, highlight the right one
  document.querySelectorAll(".answer").forEach((btn) => {
    btn.disabled = true;
    if (btn.lastChild.textContent === q.correct) btn.classList.add("right");
    else btn.classList.add("dim");
  });
  if (clickedButton && !isRight) clickedButton.classList.remove("dim");

  // Show the result + fun fact
  const fb = $("feedback");
  const isLast = questionIndex === QUIZZES[currentQuizKey].questions.length - 1;
  let title = isRight ? "✅ Correct! +" + points : answer === null ? "⏰ Time's up!" : "❌ Not quite!";
  fb.innerHTML = `<h2></h2><p></p><button class="btn pink">${isLast ? "See my score 🏆" : "Next ➜"}</button>`;
  fb.querySelector("h2").textContent = title;
  fb.querySelector("p").textContent = "🥦 " + q.fact;
  fb.querySelector("button").onclick = nextQuestion;
  fb.className = "feedback show " + (isRight ? "good" : "bad");
  $("score").textContent = `Score: ${score}`;
}

/* ----- Next question, or the final score ----- */
function nextQuestion() {
  questionIndex++;
  if (questionIndex < QUIZZES[currentQuizKey].questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const total = QUIZZES[currentQuizKey].questions.length;
  $("game").classList.remove("show");
  $("results").classList.add("show");
  $("finalScore").textContent = score + " pts";

  let message;
  if (correctCount === total) message = "PERFECT! You are the Broccoli Master 👑🥦";
  else if (correctCount >= total * 0.7) message = "Amazing! Certified broccoli expert 🥦✨";
  else if (correctCount >= total * 0.4) message = "Not bad! You're a growing sprout 🌱";
  else message = "Uh oh... time to eat more broccoli 😅";
  $("finalMessage").textContent = `You got ${correctCount} out of ${total} right. ${message}`;
}

showPicker();
