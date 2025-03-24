let scores = {
  fede: 0,
  natura: 0,
  cultura: 0
};

let currentQuestionIndex = 0;

const questions = [
  {
    text: "Vivi a Termoli?",
    options: [
      {
        text: "Sì",
        points: {
          fede: 0,
          natura: 0,
          cultura: 0
        }
      },
      {
        text: "No",
        points: {
          fede: 0,
          natura: 0,
          cultura: 0
        }
      }
    ]
  },
  {
    text: "<img src='https://tourismmedia.italia.it/is/image/mitur/2480X1000_termoli_destination'/>Quando sei in vacanza, la tua giornata ideale è:",
    options: [
      {
        text: "All'insegna della calma e tranquillità",
        points: {
          fede: 1,
          natura: 1,
          cultura: 0
        }
      },
      {
        text: "Fatta per conoscere luoghi e persone",
        points: {
          fede: 0,
          natura: 0,
          cultura: 1
        }
      },
      {
        text: "Piena di cose nuove da scoprire",
        points: {
          fede: 0,
          natura: 1,
          cultura: 1
        }
      }
    ]
  },
  {
    text: "Vuoi staccare totalmente la spina e decidi di lasciare il telefono a casa e fare due passi. Dove vai?",
    options: [
      {
        text: "In riva al mare: adoro il suono delle onde",
        points: {
          fede: 0,
          natura: 1,
          cultura: 0
        }
      },
      {
        text: "A perdermi tra i vicoli del centro storico",
        points: {
          fede: 0,
          natura: 0,
          cultura: 1
        }
      },
      {
        text: "Nel mio posto segreto!",
        points: {
          fede: 1,
          natura: 0,
          cultura: 0
        }
      }
    ]
  }
];

function answerQuestion(points) {
  for (const [key, value] of Object.entries(points)) {
    scores[key] += value;
  }
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

  question.options.forEach(option => {
    let button = document.createElement("button");
    button.className = "w-full mt-2 p-3 bg-blue-500 text-white rounded-lg";
    button.innerText = option.text;
    button.onclick = () => answerQuestion(option.points);
    questionElement.appendChild(button);
  })

  quizContainer.appendChild(questionElement);
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
  result.innerText = "Ecco la tua Termoli"
  result.classList.add("text-xl", "font-bold");
  return result
}

function getResultProfile() {
  let result = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  let resultText = {
    fede: "Percorso fede",
    natura: "Percorso natura",
    cultura: "Percorso cultura"
  };

  let resultp = document.createElement("p");
  resultp.classList.add("mt-4", "text-lg", "font-semibold");
  resultp.innerText = resultText[result]
  return resultp;
}

window.onload = renderQuestion;