const QUESTIONS = [
  {
    id: 1,
    text: 'VOCÊ PREFERE TOMAR DECISÕES BASEADO EM?',
    options: [
      { id: 'a', text: 'INTUIÇÃO E SENTIMENTO', score: { mystic: 2, logical: 0 } },
      { id: 'b', text: 'ANÁLISE RACIONAL', score: { mystic: 0, logical: 2 } },
      { id: 'c', text: 'UM MEIO-TERMO', score: { mystic: 1, logical: 1 } }
    ]
  },
  {
    id: 2,
    text: 'EM UMA SALA ESCURA, O QUE VOCÊ FAZ?',
    options: [
      { id: 'a', text: 'SIGO A INTUIÇÃO', score: { mystic: 2, logical: 0 } },
      { id: 'b', text: 'PROCURO UMA LUZ', score: { mystic: 0, logical: 2 } },
      { id: 'c', text: 'PARO E OBSERVO', score: { mystic: 1, logical: 1 } }
    ]
  },
  {
    id: 3,
    text: 'QUAL DESSES TE ATRAI MAIS?',
    options: [
      { id: 'a', text: 'SONHOS E SÍMBOLOS', score: { mystic: 2, logical: 0 } },
      { id: 'b', text: 'FATOS CONCRETOS', score: { mystic: 0, logical: 2 } },
      { id: 'c', text: 'CONEXÕES ENTRE AMBOS', score: { mystic: 1, logical: 1 } }
    ]
  }
];

// ESTADO
let answers = {};
let current = 0;

// ELEMENTOS
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress-bar');
const resultSection = document.getElementById('result');
const quizSection = document.getElementById('quiz');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restartBtn');

function renderQuestion() {
  const q = QUESTIONS[current];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.setAttribute('data-opt', opt.id);
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = `<div>${opt.text}</div>`;
    btn.addEventListener('click', () => selectOption(opt.id));

    // Restaurar seleção se já respondida
    if (answers[q.id] === opt.id) {
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    }

    optionsEl.appendChild(btn);
  });

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === QUESTIONS.length - 1 ? 'VER RESULTADO' : 'PRÓXIMA';
  updateProgress();
}

function selectOption(optId) {
  const q = QUESTIONS[current];
  answers[q.id] = optId;

  // Visual
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.getAttribute('data-opt') === optId) {
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  const q = QUESTIONS[current];
  if (!answers[q.id]) {
    // Pequena animação para indicar que precisa responder
    optionsEl.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }],
      { duration: 240 }
    );
    return;
  }

  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
});

function updateProgress() {
  const pct = Math.round(((current + 1) / QUESTIONS.length) * 100);
  progressBar.style.width = pct + '%';
}

function showResult() {
  let total = { mystic: 0, logical: 0 };

  QUESTIONS.forEach(q => {
    const sel = answers[q.id];
    const option = q.options.find(o => o.id === sel);
    if (option && option.score) {
      total.mystic += option.score.mystic || 0;
      total.logical += option.score.logical || 0;
    }
  });

  let verdict = '';
  if (total.mystic > total.logical) {
    verdict = 'VOCÊ TEM UMA ALMA INTUITIVA E SENSÍVEL — O ORÁCULO RECOMENDA CONFIAR NOS SINAIS.';
  } else if (total.logical > total.mystic) {
    verdict = 'VOCÊ É ANALÍTICO E PRÁTICO — O ORÁCULO VÊ CLAREZA E FOCO EM SUA MENTE.';
  } else {
    verdict = 'HÁ UM EQUILÍBRIO ENTRE RAZÃO E INTUIÇÃO — VOCÊ NAVEGA BEM ENTRE OS DOIS MUNDOS.';
  }

  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  resultSection.setAttribute('aria-hidden', 'false');
  resultText.textContent = verdict;
}

restartBtn.addEventListener('click', () => {
  answers = {};
  current = 0;
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  quizSection.setAttribute('aria-hidden', 'false');
  renderQuestion();
});

// INICIALIZA
renderQuestion();
