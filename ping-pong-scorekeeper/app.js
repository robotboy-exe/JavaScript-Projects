const player1 = {
  score: 0,
  button: document.querySelector("#p1"),
  display: document.querySelector("#p1Display"),
};
const player2 = {
  score: 0,
  button: document.querySelector("#p2"),
  display: document.querySelector("#p2Display"),
};

const resetButton = document.querySelector("#reset");
const playLimit = document.querySelector("#playto");
const deuceSpan = document.querySelector("#deuce");
let winningScore = 5;
let gameOver = false;

function updateScores(player, opponent) {
  if (!gameOver) {
    player.score += 1;
    if (
      player.score >= winningScore - 1 &&
      opponent.score >= winningScore - 1 &&
      player.score === opponent.score
    ) {
      deuceSpan.textContent = "DEUCE!";
      deuceSpan.style.display = "inline-block"; // show deuce when condition holds
    } else {
      deuceSpan.textContent = ""; // clear deuce when condition no longer holds
      deuceSpan.style.display = "none"; // remove deuce when condition holds
    }

    if (player.score >= winningScore && player.score - opponent.score >= 2) {
      gameOver = true;
      player.display.classList.add("winner");
      opponent.display.classList.add("loser");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

player1.button.addEventListener("click", function () {
  updateScores(player1, player2);
});

player2.button.addEventListener("click", function () {
  updateScores(player2, player1);
});

playLimit.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

resetButton.addEventListener("click", reset);

function reset() {
  gameOver = false;
  for (let player of [player1, player2]) {
    player.score = 0;
    player.display.textContent = 0;
    player.display.classList.remove("winner", "loser");
    player.button.disabled = false;
  }
}
