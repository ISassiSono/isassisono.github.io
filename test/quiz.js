import { questions } from './questions.js';

let scores = {
  fede: 0,
  natura: 0,
  cultura: 0
};

let currentQuestionIndex = 0;

function answerQuestion(points) {
  for (const [key, value] of Object.entries(points)) {
    scores[key] += value;
  }
  currentQuestionIndex++;
  updateQuiz();
}

function updateQuiz() {
  const progressBar = document.getElementById("progress");
  const progressBarPercent = ((currentQuestionIndex / questions.length) * 100)
  progressBar.style.width = progressBarPercent + "%";

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function renderQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  let question = questions[currentQuestionIndex];

  let isImageQuestion = question.images;

  if (isImageQuestion) {
    var questionElement = createImageQuestion(question)
  } else {
    var questionElement = createTextQuestion(question)
  }

  quizContainer.appendChild(questionElement);
}

function createImageQuestion(question) {
  let questionElement = document.createElement("div");
  questionElement.innerHTML = `<p id='question-text' class='text-lg font-semibold'>${question.text}</p>`;

  let optionsElement = document.createElement("div");
  optionsElement.classList.add("grid", "grid-cols-2", "md:grid-cols-2", "gap-4", "mt-2")

  questionElement.appendChild(optionsElement)

  let options = shuffle(question.options)
  options.forEach(option => {
    const container = document.createElement("div");
    container.className = "image-placeholder";

    const img = document.createElement("img");
    img.src = `../assets/${option.text}.jpg`;
    img.classList.add("h-auto", "max-w-full", "rounded-lg")

    img.onload = () => {
      container.classList.remove("image-placeholder")
      img.classList.remove("hidden")
      container.onclick = () => answerQuestion(option.points);
    }

    container.appendChild(img);
    optionsElement.appendChild(container);
  })
  return questionElement;
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

  quizContainer.appendChild(getResultHeader());
  quizContainer.appendChild(getResultProfile());
}

function getResultHeader() {
  let result = document.createElement("h2");
  result.innerText = "La tua Termoli è"
  result.classList.add("text-xl", "font-bold");
  return result
}

function getResultProfile() {
  let result = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  let resultText = {
    fede: "Sprituale",
    natura: "Vista mare",
    cultura: "Tra passato e presente"
  };

  let resultp = document.createElement("p");
  resultp.classList.add("mt-4", "text-lg", "font-semibold");
  resultp.innerText = resultText[result]
  return resultp;
}

window.onload = renderQuestion;