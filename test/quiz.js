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
    const pulser = document.createElement("div");
    pulser.classList.add("space-y-8", "animate-pulse", "md:space-y-0", "md:space-x-8", "rtl:space-x-reverse", "md:flex", "md:items-center")
    pulser.role = "status";

    const placeholder = document.createElement("div")
    placeholder.classList.add("flex", "items-center", "justify-center", "w-full", "aspect-square", "bg-gray-300", "rounded-lg", "dark:bg-gray-700")
    placeholder.innerHTML = '<svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" /></svg>'

    pulser.appendChild(placeholder)

    const img = document.createElement("img");
    img.src = `../assets/${option.text}.jpg`;
    img.classList.add("h-auto", "max-w-full", "rounded-lg", "hidden")
    img.onload = () => {
      pulser.remove()
      img.classList.remove("hidden")
      container.onclick = () => answerQuestion(option.points);
    }

    container.appendChild(pulser)
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