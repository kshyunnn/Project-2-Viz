let question;
let answers = [];
let correctAnswer;
let score = 0;

function setup() {
  createCanvas(800, 400);
  // Initialize the game with the first question
  nextQuestion();
}

function draw() {
  background(225);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(question, width / 2, 100);

  for (let i = 0; i < answers.length; i++) {
    let buttonSize = 40;
    let buttonX = width / 2;
    let buttonY = 150 + i * 50;

if (mouseIsPressed && mouseX > buttonX - buttonSize / 2 && mouseX < buttonX + buttonSize / 2 && mouseY > buttonY - buttonSize / 2 && mouseY < buttonY + buttonSize / 2) {
        if (i === correctAnswer) {
        score++;
      }
      nextQuestion();
    }

    fill(0);
    rect(buttonX - buttonSize / 2, buttonY - buttonSize / 2, buttonSize, buttonSize);
    fill(255);
    text(answers[i], buttonX, buttonY);
  }

  textSize(20);
  text("Score: " + score, width / 2, height - 20);
}

function initializeQuestion(q, ans, correct) {
  question = q;
  answers = ans;
  correctAnswer = correct;
}

function nextQuestion() {
  if (score >= 4) {
    // Game over condition, you can customize it
    question = "Yay! You've completed the game!";
    answers = ["Restart", "Quit", "More Info"];
    correctAnswer = -1; // No correct answer for game over message
  } else {
    // Define your next question and answers here
    if (score === 0) {
      initializeQuestion("What is Blue Bikes?", [
        "A bike-sharing program that allows users to rent bikes.",
        "An eco-friendly transportation service in Boston.",
        "A way to get around the Northeastern campus."
      ], 0);
    } else if (score === 1) {
      initializeQuestion("How can I access Blue Bikes on the Northeastern campus?", [
        "You can download the Bluebikes app.",
        "Use your Northeastern ID card to unlock a bike.",
        "Visit a Blue Bikes station on campus."
      ], 1);
    } else if (score === 2) {
      initializeQuestion("How many convenient Blue Bikes stations are in or around Northeastern?", [
        "Four",
        "Five",
        "Six"
      ], 0);
    } else if (score === 3) {
      initializeQuestion("What is the primary goal of the Blue Bikes program on campus?", [
        "Promote sustainable transportation.",
        "Reduce traffic congestion.",
        "Enhance accessibility on campus."
      ], 0);
    }
  }
}
