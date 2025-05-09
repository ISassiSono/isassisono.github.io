import { questions } from './questions.js';

const finalText = {
  it: "La tua Termoli è",
  en: "Your Termoli is"
}

const resultText = {
  it: {
    fede: "Sprituale",
    natura: "Vista mare",
    cultura: "Tra passato e presente"
  },
  en: {
    fede: "Spiritual",
    natura: "Sea view",
    cultura: "Between the past and the present"
  }
};

let scores = {
  fede: 0,
  natura: 0,
  cultura: 0
};

let currentQuestionIndex = 0;
let currentLanguage = "it";

function answerQuestion(points) {
  for (const [key, value] of Object.entries(points)) {
    scores[key] += value;
  }
  currentQuestionIndex++;
  updateQuiz();
}

function updateQuiz() {
  const progressBar = document.getElementById("progress");
  const progressBarPercent = (((currentQuestionIndex - 1) / (questions[currentLanguage].length - 1)) * 100)
  progressBar.style.width = progressBarPercent + "%";

  if (currentQuestionIndex < questions[currentLanguage].length) {
    renderQuestion();
  } else {
    showResult();
  }
}

async function renderQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  let question = questions[currentLanguage][currentQuestionIndex];

  let isImageQuestion = question.images;

  if (isImageQuestion) {
    var questionElement = await createImageQuestion(question)
  } else {
    var questionElement = createTextQuestion(question)
  }

  quizContainer.appendChild(questionElement);
}

async function createImageQuestion(question) {
  let questionElement = document.createElement("div");
  questionElement.innerHTML = `<p id='question-text' class='text-lg font-semibold'>${question.text}</p>`;

  let optionsElement = document.createElement("div");
  optionsElement.classList.add("grid", "grid-cols-2", "md:grid-cols-2", "gap-4", "mt-2");

  questionElement.appendChild(optionsElement);

  let options = shuffle(question.options);
  options.forEach(async (option) => {
    const container = document.createElement("div");

    const pulser = await loadPulserTemplate();
    container.appendChild(pulser);

    const img = document.createElement("img");
    img.src = `/assets/${option.text}.jpg`;
    img.classList.add("h-auto", "max-w-full", "rounded-lg", "hidden");

    img.onload = () => {
      pulser.remove();
      img.classList.remove("hidden");
      container.onclick = () => answerQuestion(option.points);
    };

    container.appendChild(img);
    optionsElement.appendChild(container);
  });

  return questionElement;
}

async function loadPulserTemplate() {
  const response = await fetch("img-loader.html");
  const html = await response.text();
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

function createTextQuestion(question) {
  let questionElement = document.createElement("div");
  questionElement.innerHTML = `<p id='question-text' class='text-lg font-semibold'>${question.text}</p>`;

  let options = shuffle(question.options)
  options.forEach(option => {
    let button = document.createElement("button");
    button.className = "w-full mt-2 p-3 rounded-lg";
    button.innerText = option.text;
    button.onclick = () => answerQuestion(option.points);
    questionElement.appendChild(button);
  })
  return questionElement;
}

function shuffle(list) {
  return list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.classList.add("text-center")
  quizContainer.innerHTML = '';
  let resultDiv = document.createElement("div");
  resultDiv.id = "result-text"

  resultDiv.appendChild(getResultHeader())
  resultDiv.appendChild(getResultProfile())

  quizContainer.appendChild(resultDiv);
}

function getResultHeader() {
  let result = document.createElement("h2");
  result.innerText = finalText[currentLanguage];
  result.classList.add("text-xl", "font-bold");
  return result
}

function getResultProfile() {
  let result = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  let resultp = document.createElement("p");
  resultp.classList.add("mt-4", "text-lg", "font-semibold");
  resultp.innerText = resultText[currentLanguage][result]
  return resultp;
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "it" : "en";
  updateQuiz();
}

document.getElementById("language-switch")
  .addEventListener("click", toggleLanguage);

window.onload = renderQuestion;