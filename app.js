const team1Players = document.querySelectorAll("[data-team1-player-container]");
const team2Players = document.querySelectorAll("[data-team2-player-container]");

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

const fouls = document.querySelectorAll("[data-player-fouls]");

let logContainer = document.querySelector("[data-score]");
let currentQuarter = 0;

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
}

init();

if (newQuarterBtn.innerText === "Pradėti varžybas") {
  document.querySelectorAll("button").forEach((button) => {
    if (button !== newQuarterBtn) {
      button.disabled = true; // Disable all buttons except newQuarterBtn
    }
  });
}

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
  console.log(currentQuarter);
  if (currentQuarter === 0) {
    newQuarterBtn.innerText = "Baigti kėlinį";
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    let p = document.createElement("p");
    p.innerText = `Varžybos prasideda! ${getTime()}`;
    logContainer.appendChild(p);
    currentQuarter++;
  } else if (currentQuarter > 0 && currentQuarter < 4) {
    let p = document.createElement("p");
    p.innerText = `Kėlinys ${currentQuarter} baigtas ${getTime()}`;
    logContainer.appendChild(p);
    currentQuarter++;
  } else if (currentQuarter === 4) {
    newQuarterBtn.innerText = "Baigti varžybas";
    let p = document.createElement("p");
    p.innerText = `Varžybos baigtos ${getTime()}`;
    logContainer.appendChild(p);
  }
});

newGame.addEventListener("click", (_) => {
  init();
});
