const team1Players = document.querySelectorAll("[data-team1-player-container]");
const team2Players = document.querySelectorAll("[data-team2-player-container]");
const team1ScoreBtns = document.querySelectorAll(
  "[data-points1-container] button"
);
const team2ScoreBtns = document.querySelectorAll(
  "[data-points2-container] button"
);
const newQuarterBtn = document.querySelectorAll("[data-new-quarter]");
const newGame = document.querySelectorAll("[data-new-game]");
const team1Score = document.querySelector("[data-team1-score]");
const team2Score = document.querySelector("[data-team2-score]");
let logContainer = document.querySelector("[data-log-container]");
let currentQuarter;

function getTime() {
  const now = new Date(); // Create a new Date object for the current time
  const hours = now.getHours(); // Get the current hour (0-23)
  const minutes = now.getMinutes(); // Get the current minute (0-59)
  const seconds = now.getSeconds(); // Get the current second (0-59)
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

function assignFoul(player, foulHtml) {
  let playerKey = player.replace(/\s+/g, "");
  teamFouls[playerKey]++;
  foulHtml.innerText = teamFouls[playerKey];

  let p = document.createElement("p");
  p.innerText = `${player} gavo pražangą ${getTime()}`;

  logContainer.appendChild(p);
}

function adjustTeamScore(team, value) {
  teamScore[`komanda${team}`] += value;
  team === 1
    ? (team1Score.innerText = teamScore[`komanda${team}`])
    : (team2Score.innerText = teamScore[`komanda${team}`]);

  let p = document.createElement("p");
  p.innerText = `Komanda ${team} pelnė ${value} ${
    value === 1 ? "tašką" : "taškus"
  } ${getTime()} viso taškų ${teamScore[`komanda${team}`]}`;

  logContainer.appendChild(p);
}

function newQuarter() {}

const teamFouls = {
  Komandos1žaidėjas1: 0,
  Komandos1žaidėjas2: 0,
  Komandos1žaidėjas3: 0,
  Komandos2žaidėjas1: 0,
  Komandos2žaidėjas2: 0,
  Komandos2žaidėjas3: 0,
};

const teamScore = {
  komanda1: 0,
  komanda2: 0,
};

team1Players.forEach((player) => {
  const foulButton = player.querySelector("button");
  const playerFouled = foulButton.value;
  const foulCounterHtml = player.querySelector("[data-player-fouls]");
  foulButton.addEventListener("click", (_) => {
    assignFoul(playerFouled, foulCounterHtml);
  });
});

team2Players.forEach((player) => {
  const foulButton = player.querySelector("button");
  const playerFouled = foulButton.value;
  const foulCounterHtml = player.querySelector("[data-player-fouls]");
  foulButton.addEventListener("click", (_) => {
    assignFoul(playerFouled, foulCounterHtml);
  });
});

team1ScoreBtns.forEach((button) => {
  button.addEventListener("click", (_) => {
    adjustTeamScore(1, parseInt(button.value));
  });
});

team2ScoreBtns.forEach((button) => {
  button.addEventListener("click", (_) => {
    adjustTeamScore(2, parseInt(button.value));
  });
});

// newQuarterBtn.addEventListener("click", (_) => {
//   currentQuarter === 4
//     ? (newQuarterBtn.innerText = "Baigti varžybas")
//     : currentQuarter++;
// });
