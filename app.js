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

let eventLog = [];

const teamPlayers = document.querySelectorAll("[data-team-player-container]");

const team1ScoreBtns = document.querySelectorAll(
  "[data-points1-container] button"
);
const team2ScoreBtns = document.querySelectorAll(
  "[data-points2-container] button"
);

const newQuarterBtn = document.querySelector("[data-new-quarter]");
const newGame = document.querySelector("[data-new-game]");

const team1Score = document.querySelector("[data-team1-score]");
const team2Score = document.querySelector("[data-team2-score]");
const quarter = document.querySelector("[data-quarter]");

const fouls = document.querySelectorAll("[data-player-fouls]");

let logContainer = document.querySelector("[data-score]");
let currentQuarter;

function populateLog(message) {
  eventLog.push(message);
  eventLog.forEach((event) => {
    logContainer.appendChild(event);
  });
}

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

  let message = document.createElement("p");
  message.innerText = `${player} gavo pražangą ${getTime()}`;

  populateLog(message);
}

function adjustTeamScore(team, value) {
  teamScore[`komanda${team}`] += value;
  team === 1
    ? (team1Score.innerText = teamScore[`komanda${team}`])
    : (team2Score.innerText = teamScore[`komanda${team}`]);

  let message = document.createElement("p");
  message.innerText = `Komanda ${team} pelnė ${value} ${
    value === 1 ? "tašką" : "taškus"
  } ${getTime()} viso taškų ${teamScore[`komanda${team}`]}`;

  populateLog(message);
}

function init() {
  Object.keys(teamFouls).forEach((key) => {
    teamFouls[key] = 0;
  });
  Object.keys(teamScore).forEach((key) => {
    teamScore[key] = 0;
  });
  team1Score.innerText = 0;
  team2Score.innerText = 0;
  fouls.forEach((foul) => {
    foul.innerText = 0;
  });
  logContainer.innerHTML = "";
  currentQuarter = 0;
  newQuarterBtn.innerText = "Pradėti varžybas";
  newQuarterBtn.disabled = false;
  quarter.innerText = currentQuarter;
}

init();

if (newQuarterBtn.innerText === "Pradėti varžybas") {
  document.querySelectorAll("button").forEach((button) => {
    if (button !== newQuarterBtn) {
      button.disabled = true; // Disable all buttons except newQuarterBtn
    }
  });
}

teamPlayers.forEach((player) => {
  const foulButton = player.querySelector("button");
  const playerFouled = foulButton.value;
  const foulCounterHtml = player.querySelector("[data-player-fouls]");
  foulButton.addEventListener("click", (_) => {
    assignFoul(playerFouled, foulCounterHtml);
  });
});

team1ScoreBtns.forEach((button) => {
  button.addEventListener("click", (_) => {
    console.log("testas");
    adjustTeamScore(1, parseInt(button.value));
  });
});

team2ScoreBtns.forEach((button) => {
  button.addEventListener("click", (_) => {
    adjustTeamScore(2, parseInt(button.value));
  });
});

newQuarterBtn.addEventListener("click", (_) => {
  if (currentQuarter === 0) {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    let message = document.createElement("p");
    message.innerText = `Varžybos prasideda! ${getTime()}`;
    populateLog(message);
    newQuarterBtn.innerText = "Baigti kėlinį";
    currentQuarter++;
    quarter.innerText = currentQuarter;
  } else if (currentQuarter > 0 && currentQuarter < 4) {
    let message = document.createElement("p");
    message.innerText = `Kėlinys ${currentQuarter} baigtas ${getTime()}`;
    populateLog(message);
    currentQuarter++;
    quarter.innerText = currentQuarter;
    newQuarterBtn.innerText = "Baigti varžybas";
  } else if (currentQuarter === 4) {
    newQuarterBtn.disabled = true;
    let message = document.createElement("p");
    message.innerText = `Varžybos baigtos ${getTime()}`;
    populateLog(message);
    quarter.innerText = currentQuarter;
  }
});

newGame.addEventListener("click", (_) => {
  init();
});
