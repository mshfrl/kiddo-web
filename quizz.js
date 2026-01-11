
// get subject and level from URL
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject") || "math";
const level = params.get("level") || "easy";

// quiz title
document.getElementById("quiz-title").textContent =
  subject.charAt(0).toUpperCase() + subject.slice(1) + " Quiz";

// get sound elements from HTML
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// safe play function
function playSafeSound(sound) {
  if (!sound) return;
  sound.pause();
  sound.currentTime = 0;
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.warn("Sound play blocked:", err.message);
    });
  }
}

/* quiz data  */
const quizData = {
  math: {
    easy: [
      { q: "5 + 10 = ?", options: ["15", "20", "40", "10"], answer: "15" },
      { q: "5 + 6 = ?", options: ["12", "20", "11", "10"], answer: "11" },
      { q: "10 - 2 = ?", options: ["6", "8", "17", "12"], answer: "8" },
      { q: "3 x 2 = ?", options: ["9", "5", "6", "8"], answer: "6" },
      { q: "10 / 2 = ?", options: ["5", "2", "10", "4"], answer: "5" }
    ],
    medium: [
      { q: "15 + 15 = ?", options: ["20", "30", "20", "25"], answer: "30" },
      { q: "20 - 10 = ?", options: ["10", "20", "5", "15"], answer: "10" },
      { q: "4 x 10 = ?", options: ["16", "8", "40", "12"], answer: "40" },
      { q: "25 / 5 = ?", options: ["5", "3", "7", "4"], answer: "5" },
      { q: "7 + 8 = ?", options: ["14", "15", "16", "17"], answer: "15" }
    ],
    hard: [
      { q: "100 - 50 = ?", options: ["40", "50", "60", "70"], answer: "50" },
      { q: "200 + 100 = ?", options: ["300", "400", "500", "600"], answer: "300" },
      { q: "5 x 12 = ?", options: ["60", "72", "84", "96"], answer: "60" },
      { q: "15 / 3 = ?", options: ["5", "4", "3", "2"], answer: "5" },
      { q: "9 x 9 = ?", options: ["81", "72", "91", "82"], answer: "81" }
    ]
  },

  english: {
    easy: [
      { q: "My dog _ _ _ sleeping on the bed", options: ["are", "am", "is", "was"], answer: "is" },
      { q: "What is the opposite of hot", options: ["cold", "warm", "freezing", "burn"], answer: "cold" },
      { q: "Which sentence is correct?", options: ["She running fast.", "She run fast.", "She runs fast.", "She running faster."], answer: "She runs fast." },
      { q: "Choose the correct spelling", options: ["elefant", "elephant", "elephent", "elphent"], answer: "elephant" },
      { q: "I _ _ _ in Malaysia", options: ["live", "life", "leaving", "sleep"], answer: "live" }
    ],
    medium: [
      { q: "She _ _ _ to the park now.", options: ["going", "is going", "goes", "went"], answer: "is going" },
      { q: "My mom _ _ _ on the supermarket yesterday to buy some grocery.", options: ["go", "went", "going", "gone"], answer: "went" },
      { q: "They _ _ _ playing football every weekend.", options: ["is", "are", "am", "was"], answer: "are" },
      { q: "He _ _ _ his homework before dinner last night.", options: ["do", "did", "done", "doing"], answer: "did" },
      { q: "Choose the correct spelling", options: ["accomodate", "acommodate", "accommodate", "acomodate"], answer: "accommodate" },
      { q: "The cat is _ _ _ the table.", options: ["on", "in", "at", "by"], answer: "on" }
    ],
    hard: [
      { q: "Despite _ _ _ hard, he failed the exam.", options: ["studies", "to study", "studying", "study"], answer: "studying" },
      { q: "If I _ _ _ earlier, I would have caught the bus.", options: ["left", "had left", "have left", "leaving"], answer: "had left" },
      { q: "She suggested _ _ _ to the new restaurant downtown.", options: ["go", "going", "to go", "gone"], answer: "going" },
      { q: "The book, _ _ _ was on the table, is missing.", options: ["which", "that", "who", "whom"], answer: "which" },
      { q: "Choose the correct spelling", options: ["definately", "definetly", "definitely", "definidely"], answer: "definitely" }
    ]
  },

  science: {
    easy: [
      { q: "What should student always wear to protect their eyes in the lab?", options: ["goggles", "gloves", "hat", "mask"], answer: "goggles" },
      { q: "Are animals need oxygen to live?", options: ["Yes", "No", "Maybe", "I don't know"], answer: "Yes" },
      { q: "Who studies science?", options: ["Farmers", "Painters", "Scientists", "Engineers"], answer: "Scientists" },
      { q: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
      { q: "What is H2O commonly known as?", options: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"], answer: "Water" }
    ],
    medium: [
      { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
      { q: "What is the center of an atom called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], answer: "Nucleus" },
      { q: "Which organ in the human body is responsible for pumping blood?", options: ["Lungs", "Brain", "Heart", "Liver"], answer: "Heart" },
      { q: "What force keeps us grounded on Earth?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], answer: "Gravity" },
      { q: "What is the process by which plants make their food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], answer: "Photosynthesis" }
    ],
    hard: [
      { q: "What particle in an atom has a negative charge?", options: ["Proton", "Neutron", "Electron", "Photon"], answer: "Electron" },
      { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Gd", "Go"], answer: "Au" },
      { q: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], answer: "Mitochondria" },
      { q: "What type of bond involves the sharing of electron pairs between atoms?", options: ["Ionic Bond", "Covalent Bond", "Hydrogen Bond", "Metallic Bond"], answer: "Covalent Bond" },
      { q: "What is the term for a species that no longer exists?", options: ["Endangered", "Extinct", "Vulnerable", "Threatened"], answer: "Extinct" }
    ]
  }
};

/* state */
let questions = quizData[subject][level];
let index = 0;
let score = 0;

/* elements ( question, option, next, result) */
const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

/* load  */
loadQuestion();

/* functions - correct , wrong */
function loadQuestion() {
  const q = questions[index];
  questionEl.textContent = q.q;
  resultEl.textContent = "";
  nextBtn.style.display = "none";

  options.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
    btn.onclick = () => checkAnswer(btn, q.answer);
  });
}

function checkAnswer(btn, answer) {
  options.forEach(b => (b.disabled = true));
  nextBtn.style.display = "block";

  if (btn.textContent === answer) {
    btn.classList.add("correct");
    score++;
    resultEl.textContent = "Correct! 🎉";
    playSafeSound(correctSound);
  } else {
    btn.classList.add("wrong");
    playSafeSound(wrongSound);

    options.forEach(b => {
      if (b.textContent === answer) {
        b.classList.add("correct");
      }
    });
    resultEl.textContent = "Wrong 😢";
  }
}

nextBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz Completed 🎊";
    document.querySelector(".options").style.display = "none";
    nextBtn.style.display = "none";
    resultEl.textContent = `Score: ${score} / ${questions.length}`;
  }
};

/* start screen  */
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("startScreen");
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.style.display = "none";

  startBtn.addEventListener("click", () => {
    startScreen.style.transition = "opacity 0.6s ease";
    startScreen.style.opacity = 0;

    setTimeout(() => {
      startScreen.style.display = "none";
      quizContainer.style.display = "block";
      quizContainer.style.opacity = 0;
      quizContainer.style.transform = "scale(0.95)";

      setTimeout(() => {
        quizContainer.style.transition =
          "opacity 0.8s ease, transform 0.8s ease";
        quizContainer.style.opacity = 1;
        quizContainer.style.transform = "scale(1)";
      }, 50);
    }, 600);
  });
});
