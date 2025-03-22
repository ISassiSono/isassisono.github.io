let scores = { A: 0, B: 0, C: 0 };
let currentQuestionIndex = 0;

const questions = [
  { text: "What's your favorite weekend activity?", options: { A: "Hiking 🥾", B: "Reading 📖", C: "Painting 🎨" } },
  { text: "Pick a pet:", options: { A: "Dog 🐶", B: "Cat 🐱", C: "Bird 🐦" } },
  { text: "Choose a vacation spot:", options: { A: "Mountains ⛰️", B: "Beach 🏖️", C: "City 🌆" } }
];

function answerQuestion(category) {
  scores[category]++;
  currentQuestionIndex++;
  updateQuiz();
}

function updateQuiz() {
  document.getElementById("progress").style.width = ((currentQuestionIndex / questions.length) * 100) + "%";
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
  let questionElement = document.createElement("div");
  questionElement.innerHTML = `<p class='text-lg font-semibold'>${question.text}</p>`;

  Object.keys(question.options).forEach(category => {
    let button = document.createElement("button");
    button.className = "w-full mt-2 p-3 bg-blue-500 text-white rounded-lg";
    button.innerText = question.options[category];
    button.onclick = () => answerQuestion(category);
    questionElement.appendChild(button);
  });

  quizContainer.appendChild(questionElement);
}

function showResult() {
  document.getElementById("quiz-container").classList.add('hidden');
  let result = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  let resultText = {
    A: "You are an adventurous explorer! 🏔️",
    B: "You are a calm and thoughtful person! 📚",
    C: "You are a creative and artistic soul! 🎨"
  };
  document.getElementById("result").innerText = resultText[result];
  document.getElementById("result-container").classList.remove('hidden');
}

window.onload = renderQuestion;