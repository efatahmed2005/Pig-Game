"use strict";

const rollBtn = document.getElementById("roll_dice");
const holdBtn = document.getElementById("hold");
const newBtn = document.getElementById("newGame");
const diceImg = document.getElementById("image");
const winMessage = document.getElementById("winMsg");
let finalScore = [0, 0];
diceImg.classList.add("invisible");
winMessage.classList.add("invisible");
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const switchFunction = function () {
  document.getElementById(`Fscore${activePlayer}`).textContent =
    finalScore[activePlayer];
  if (finalScore[activePlayer] >= 50) {
    playing = false;
    return;
  }
  document.getElementById(`score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById("player_0").classList.toggle("bg-yellow-100/20");
  document.getElementById("player_1").classList.toggle("bg-yellow-100/20");
};

rollBtn.addEventListener("click", function () {
  if (!playing) {
    return;
  }
  let score = Math.floor(Math.random() * 6) + 1;
  diceImg.classList.remove("invisible");
  diceImg.src = `images/${score}.png`;

  if (score != 1) {
    currentScore += score;
    document.getElementById(`score-${activePlayer}`).textContent = currentScore;
  } else {
    switchFunction();
  }
});

holdBtn.addEventListener("click", function () {
  if (!playing) {
    return;
  }
  finalScore[activePlayer] += currentScore;
  if (finalScore[activePlayer] >= 50) {
    winMessage.classList.remove("invisible");
    document.getElementById("winName").textContent =
      `Player ${activePlayer + 1} wins !`;
    document
      .getElementById(`player_${activePlayer}`)
      .classList.add("bg-yellow-900");
  }
  switchFunction();
});

newBtn.addEventListener("click", function () {
  finalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceImg.classList.add("invisible");
  document.getElementById("Fscore0").textContent = "00";
  document.getElementById("Fscore1").textContent = "00";
  if (document.getElementById("player_0").classList.contains("bg-yellow-900")) {
    document.getElementById("player_0").classList.remove("bg-yellow-900");
  }
  if (document.getElementById("player_1").classList.contains("bg-yellow-900")) {
    document.getElementById("player_1").classList.remove("bg-yellow-900");
  }

  document.getElementById("player_1").classList.remove("bg-yellow-100/20");

  if (
    !document.getElementById("player_0").classList.contains("bg-yellow-900")
  ) {
    document.getElementById("player_0").classList.add("bg-yellow-100/20");
  }
  winMessage.classList.add("invisible");
  document.getElementById("winName").textContent = "";
  document.getElementById("score-0").textContent = "00";
  document.getElementById("score-1").textContent = "00";
});
