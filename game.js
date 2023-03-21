const btn = document.querySelectorAll(".btn");
const body = document.querySelector("body");
const levelTitle = document.querySelector("#level-title");
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

///Animating the key-press
const animatePress = function (currentColor) {
  currentColor.classList.add("pressed");
  setTimeout(() => {
    currentColor.classList.remove("pressed");
  }, 100);
};

////EXECUTING THE NEW SOUND EVENT
const playSound = function (nameSound) {
  const audio = new Audio(`sounds/${nameSound}.mp3`);
  audio.play();
};

////LISTENING FOR THE CLICKED BUTTON
btn.forEach((el) => {
  el.addEventListener("click", function () {
    const userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(this);

    checkAnswer(userClickedPattern.length - 1);
  });
});

////EXECUTING THE SOUND AND THE CLICK EVENT
const nextSequence = function () {
  const randonNum = Math.round(Math.random() * 3);

  const randomChoosenColor = buttonColors[randonNum];

  gamePattern.push(randomChoosenColor);

  document.getElementById(randomChoosenColor).style.opacity = 0;

  setTimeout(() => {
    document.getElementById(randomChoosenColor).style.opacity = 1;
  }, 100);

  playSound(randomChoosenColor);

  level++;

  levelTitle.innerHTML = `Level ${level}`;

  userClickedPattern = [];
};

////checking for answer
const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    levelTitle.innerHTML = "Game Over, Press Any Key to Restart";

    const audio = new Audio(`sounds/wrong.mp3`);

    audio.play();

    body.classList.add("game-over");

    setTimeout(() => {
      body.classList.remove("game-over");
    }, 200);

    startOver();
  }
};

////STARTING IF THE USER GOT IT WRONG
const startOver = function () {
  level = 0;

  start = false;

  gamePattern = [];
};

////STARTING THE GAME
document.addEventListener("keypress", function () {
  if (!start) {
    levelTitle.innerHTML = `Level ${level}`;
  }

  nextSequence();

  start = true;
});

///check answer option
