const openQuizBtn = document.getElementById('openQuiz');
const quizModal = document.getElementById('quizModal');
const closeQuizBtn = document.getElementById('closeQuiz');
const questionText = document.getElementById('questionText');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('qProgress');
const resultScreen = document.getElementById('resultScreen');
const scoreText = document.getElementById('scoreText');
const restartQuizBtn = document.getElementById('restartQuiz');

const quizData = [
  {
    question: "¿Cuál es el punto clave al entrar en una curva?",
    options: [
      "Mantener freno fuerte durante la curva",
      "Frenar antes del ápice y soltar suavemente",
      "Acelerar antes de entrar",
      "Cambiar de marcha dentro de la curva"
    ],
    correct: 1
  },
  {
    question: "¿Qué revisar antes de una sesión en pista?",
    options: [
      "Presión de llantas y frenos",
      "Solo la estética de la moto",
      "La radio del equipo",
      "Nada, empezar rápido"
    ],
    correct: 0
  },
  {
    question: "¿Cuál es una buena práctica de seguridad?",
    options: [
      "Usar casco abierto para mejor vista",
      "Usar mono con protecciones y casco integral",
      "Ignorar las banderas en pista",
      "Entrar en pista sin revisar controles"
    ],
    correct: 1
  },
  {
    question: "Si pierdes una sesión de práctica, ¿qué haces?",
    options: [
      "No vuelves a intentarlo",
      "Analizas datos y mejoras en la próxima sesión",
      "Desmotivar al equipo",
      "Vender la moto"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

openQuizBtn.addEventListener('click', () => {
  quizModal.classList.add('visible');
  startQuiz();
});

closeQuizBtn.addEventListener('click', () => {
  quizModal.classList.remove('visible');
  resultScreen.style.display = 'none';
});

restartQuizBtn.addEventListener('click', () => {
  resultScreen.style.display = 'none';
  startQuiz();
});

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateProgress();
  nextBtn.style.display = 'none';
}

function showQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('option');
    btn.addEventListener('click', () => checkAnswer(index));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correct) {
      btn.classList.add('correct');
    } else if (index === selected) {
      btn.classList.add('incorrect');
    }
  });
  if (selected === q.correct) score++;
  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
    updateProgress();
    nextBtn.style.display = 'none';
  } else {
    showResults();
  }
});

function showResults() {
  questionText.textContent = "Resultados del Quiz";
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
  resultScreen.style.display = 'block';
  scoreText.textContent = `Respondiste correctamente ${score} de ${quizData.length} preguntas.`;
  let mensaje = "";
  if (score === quizData.length) mensaje = "¡Excelente! Conocimiento sólido en moto velocidad.";
  else if (score >= 2) mensaje = "Buen trabajo, sigue estudiando técnica y seguridad.";
  else mensaje = "Practica más y repasa las técnicas básicas.";
  scoreText.textContent += ` ${mensaje}`;
}

function updateProgress() {
  progressEl.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
}
