
// Add event listener to start button
document.getElementById("start").addEventListener("click", function() {
  startQuiz();
});

// Global variables
let timer;
let secondsLeft = 60;
let currentQuestionIndex = 0;
let score = 0;

// Array of quiz questions and answers
const questions = [
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswer: 0,
  },
  // Add more questions...
];

function startQuiz() {
  // Hide start page and show quiz section
  document.getElementById("startpage").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  // Start the countdown timer
  startCountdown();

  // Display the first question
  showQuestion();
}

function startCountdown() {
  timer = setInterval(function () {
    // Update timer element
    document.getElementById("timer").textContent = "Time left: " + secondsLeft;

    secondsLeft--;

    if (secondsLeft < 0) {
      
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display the current question
  document.getElementById("questions").textContent = currentQuestion.question;

  // Display the answer options
  document.getElementById("a").textContent = currentQuestion.answers[0];
  document.getElementById("b").textContent = currentQuestion.answers[1];
  document.getElementById("c").textContent = currentQuestion.answers[2];
  document.getElementById("d").textContent = currentQuestion.answers[3];
}

function checkAnswer(selectedAnswerIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.correctAnswer) {
   
    score++;
  } else {
   
    secondsLeft -= 10;
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if all questions have been answered
  if (currentQuestionIndex === questions.length) {
    // End the quiz
    clearInterval(timer);
    endQuiz();
  } else {
    // Display the next question
    showQuestion();
  }
}

function endQuiz() {
  // Hide the quiz section and show the end section
  document.getElementById("quiz").style.display = "none";
  document.getElementById("End").style.display = "block";

  // Display the final score
  document.getElementById("finalScore").textContent = "Final Score: " + score;

  // Add event listener to submit score button
  document.getElementById("submitScore").addEventListener("click", saveScore);
}

function saveScore() {
  const initials = document.getElementById("initials").value;

  // Save the initials and score to localStorage
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials, score });
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // Reset the quiz for replay
  resetQuiz();
}

function resetQuiz() {
  // Reset variables and UI elements
  secondsLeft = 60;
  currentQuestionIndex = 0;
  score = 0;

  // Hide the end section and show the start page
  document.getElementById("End").style.display = "none";
  document.getElementById("startpage").style.display = "block";
}

function showHighscore() {
  // Hide start page and show highscore container
  document.getElementById("startpage").style.display = "none";
  document.getElementById("highscoreContainer").style.display = "block";
}

// Call the startQuiz function to initialize the quiz
startQuiz();
