// Interaktivnost: mobilna navigacija, filtriranje, lightbox, izziv in kviz
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const filterButtons = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('.photo-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  photoCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
photoCards.forEach(card => card.addEventListener('click', () => {
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  document.querySelector('#lightboxTitle').textContent = card.dataset.title;
  document.querySelector('#lightboxStory').textContent = card.dataset.story;
  document.querySelector('#lightboxAuthor').textContent = card.dataset.author.toUpperCase() + '  /  ' + card.querySelector('.photo-overlay small').textContent;
  lightbox.showModal();
}));
document.querySelector('#lightboxClose').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const challengeChecks = [...document.querySelectorAll('.challenge-item input')];
function updateProgress() {
  const done = challengeChecks.filter(check => check.checked).length;
  document.querySelector('#progressText').textContent = `${done} od ${challengeChecks.length}`;
  document.querySelector('#progressFill').style.width = `${done / challengeChecks.length * 100}%`;
}
challengeChecks.forEach(check => check.addEventListener('change', updateProgress));

const questions = [
  {q:'Kaj je glavni namen cilja SDG 14?', options:['Povečati količino plastike v morju','Ohranjati oceane in trajnostno uporabljati morske vire','Ustaviti vse dejavnosti ob obali'], correct:1, explain:'Pravilno! SDG 14 se osredotoča na ohranjanje oceanov, morij in morskih virov.'},
  {q:'Kaj pomaga preprečevati onesnaževanje morja s plastiko?', options:['Odmetavanje smeti na ulici','Zmanjšanje plastike za enkratno uporabo','Spuščanje odpadkov v odtok'], correct:1, explain:'Tako je! Manj plastike za enkratno uporabo pomeni manj možnosti, da ta konča v naravi in morju.'},
  {q:'Zakaj je pomembno varovati koralne grebene?', options:['So pomemben življenjski prostor številnih morskih vrst','Ker preprečujejo vse nevihte','Ker v njih ne živijo živali'], correct:0, explain:'Odlično! Koralni grebeni so pomembni ekosistemi in nudijo življenjski prostor številnim vrstam.'}
];
let questionIndex = 0, score = 0, answered = false;
const questionText = document.querySelector('#questionText');
const optionsBox = document.querySelector('#quizOptions');
const feedback = document.querySelector('#quizFeedback');
const nextButton = document.querySelector('#quizNext');
const step = document.querySelector('#quizStep');
const dots = [...document.querySelectorAll('.quiz-dots i')];
function renderQuestion() {
  const question = questions[questionIndex];
  step.textContent = `VPRAŠANJE 0${questionIndex + 1} / 03`;
  dots.forEach((dot, i) => dot.classList.toggle('current', i === questionIndex));
  questionText.textContent = question.q;
  optionsBox.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => chooseAnswer(index, button));
    optionsBox.appendChild(button);
  });
  feedback.textContent = '';
  nextButton.disabled = true;
  nextButton.innerHTML = questionIndex === questions.length - 1 ? 'Pokaži rezultat →' : 'Naslednje vprašanje →';
  answered = false;
}
function chooseAnswer(index, selectedButton) {
  if (answered) return;
  answered = true;
  const question = questions[questionIndex];
  const buttons = [...optionsBox.querySelectorAll('button')];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === question.correct) button.classList.add('correct');
  });
  if (index === question.correct) {
    score++;
    feedback.textContent = question.explain;
  } else {
    selectedButton.classList.add('wrong');
    feedback.textContent = 'Še enkrat premisli. ' + question.explain;
  }
  nextButton.disabled = false;
}
nextButton.addEventListener('click', () => {
  if (!answered) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    questionText.textContent = 'Tvoj rezultat';
    optionsBox.innerHTML = '';
    feedback.textContent = '';
    document.querySelector('.quiz-dots').hidden = true;
    step.textContent = 'KVIZ ZAKLJUČEN';
    document.querySelector('#quizResult').hidden = false;
    document.querySelector('#quizResult').textContent = `${score} / ${questions.length} pravilnih odgovorov — ${score === 3 ? 'Odlično poznaš SDG 14!' : 'Zdaj veš še malo več. Poskusi znova!'}`;
    nextButton.textContent = 'Ponovi kviz ↻';
    nextButton.disabled = false;
    nextButton.onclick = () => {
      questionIndex = 0; score = 0;
      document.querySelector('.quiz-dots').hidden = false;
      document.querySelector('#quizResult').hidden = true;
      nextButton.onclick = null;
      renderQuestion();
    };
  }
});
renderQuestion();
