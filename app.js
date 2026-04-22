// IMPORTS
import { saveUser, getUsers, saveScore } from './storage/db.js';
import { getQuestions } from './services/api.js';

// ELEMENTS on screen
const loginScreen = document.getElementById("login-screen");
const subjectScreen = document.getElementById("subject-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("name-input");
const classInput = document.getElementById("class-input");
const startBtn = document.getElementById("start-btn");
const previousUsersDiv = document.getElementById("previous-users");

const questionsContainer = document.getElementById("questions-container");
const submitBtn = document.getElementById("submit-btn");

const scoreDiv = document.getElementById("score");
const answersDiv = document.getElementById("answers");
const backBtn = document.getElementById("back-btn");

// STATE
let currentUser = null;
let currentQuestions = [];

// LOAD PREVIOUS USERS
function loadUsers() {
  const users = getUsers();
  previousUsersDiv.innerHTML = "";

  Object.keys(users).forEach(name => {
    const btn = document.createElement("button");
    btn.innerText = name;

    btn.onclick = () => {
      currentUser = name;
      showSubjects();
    };

    previousUsersDiv.appendChild(btn);
  });
}

loadUsers();

// LOGIN
startBtn.onclick = () => {
  const name = nameInput.value.trim();
  const cls = classInput.value.trim();

  if (!name) return alert("Enter your name");

  currentUser = name;
  saveUser(name, cls);

  loadUsers();
  showSubjects();
};

// SHOW SUBJECT SCREEN
function showSubjects() {
  loginScreen.classList.add("hidden");
  subjectScreen.classList.remove("hidden");
}

// SUBJECT CLICK
document.querySelectorAll(".subject-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const subject = btn.dataset.subject;
    startQuiz(subject);
  });
});

// START QUIZ
async function startQuiz(subject) {
  subjectScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  questionsContainer.innerHTML = "Loading questions...";

  currentQuestions = await getQuestions(subject);

  renderQuestions();
}

// RENDER QUESTIONS
function renderQuestions() {
  questionsContainer.innerHTML = "";

  currentQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question");

    let html = `<p>${i + 1}. ${q.question}</p>`;

    q.options.forEach((opt, j) => {
      html += `
        <label class="option">
          <input type="radio" name="q${i}" value="${j}">
          ${opt}
        </label>
      `;
    });

    div.innerHTML = html;
    questionsContainer.appendChild(div);
  });
}

// SUBMIT QUIZ
submitBtn.onclick = () => {
  let score = 0;
  let answerHTML = "";

  currentQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const val = selected ? parseInt(selected.value) : -1;

    if (val === q.answer) score++;

    answerHTML += `
      <p>
        <strong>Q${i + 1}:</strong> ${q.question}<br>
        Correct: ${q.options[q.answer]}
      </p>
    `;
  });

  scoreDiv.innerText = `Score: ${score}/${currentQuestions.length}`;
  answersDiv.innerHTML = answerHTML;

  saveScore(currentUser, score);

  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
};

// BACK BUTTON
backBtn.onclick = () => {
  resultScreen.classList.add("hidden");
  subjectScreen.classList.remove("hidden");
};