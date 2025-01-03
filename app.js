const players = {
  teamOne: {},
  teamTwo: {},
};

const teamScore = {
  komanda1: 0,
  komanda2: 0,
};

let eventLog = [];

const teamPlayers = document.querySelectorAll("[data-team-player-container]");
const playerNames = document.querySelectorAll("input");

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

function getPlayerDetails(player) {
  let inputElement = player.querySelector("input");
  const inputValue = inputElement.value; //player name
  const inputClass = inputElement.className; //team
  return [inputValue, inputClass];
}

function generatePlayers() {
  teamPlayers.forEach((player) => {
    getPlayerDetails(player)[1] === "teamOne"
      ? (players.teamOne[getPlayerDetails(player)[0]] = 0)
      : (players.teamTwo[getPlayerDetails(player)[0]] = 0);
  });
}

function populateLog(message) {
  // Add the new message to the log
  eventLog.push(message);

  // Clear the container before rendering
  logContainer.innerHTML = "";

  // Iterate through the log in reverse order and append elements
  eventLog
    .slice()
    .reverse()
    .forEach((event) => {
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

function assignFoul(player, team, foulHtml) {
  players[team][player]++;
  foulHtml.innerText = players[team][player];
  let message = document.createElement("p");
  team === "teamOne"
    ? (message.innerText = `${player} iš pirmos komandos gavo pražangą ${getTime()}`)
    : (message.innerText = `${player} iš antros komandos gavo pražangą ${getTime()}`);

  populateLog(message);
}

function kickPlayer(foulButton, foulCount) {
  if (foulCount === 4) {
    foulButton.disabled = true;
    foulButton.style.backgroundColor = "gray";
  }
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
  Object.keys(teamScore).forEach((key) => {
    teamScore[key] = 0;
  });
  team1Score.innerText = 0;
  team2Score.innerText = 0;
  fouls.forEach((foul) => {
    foul.innerText = 0;
  });
  logContainer.innerHTML = "";
  eventLog = [];
  generatePlayers();
  currentQuarter = 0;
  newQuarterBtn.innerText = "Pradėti varžybas";
  newQuarterBtn.disabled = false;
  quarter.innerText = currentQuarter;
  if (newQuarterBtn.innerText === "Pradėti varžybas") {
    document.querySelectorAll("button").forEach((button) => {
      if (button !== newQuarterBtn) {
        button.disabled = true; // Disable all buttons except newQuarterBtn
        newGame.disabled = false;
      }
    });
  }
}

init();

teamPlayers.forEach((player) => {
  const button = player.querySelector("button");
  const oldName = button.value;
  console.log(oldName);
  const team = getPlayerDetails(player)[1];
  const input = player.querySelector("input");
  let newName = "";

  input.addEventListener("blur", function (event) {
    newName = event.target.value.trim();
    // Delay to ensure internal value updates are complete
    setTimeout(() => {
      input.value = newName;
      input.setAttribute("value", newName); // Enforce update
      if (newName !== oldName) {
        if (players[team][oldName] !== undefined) {
          players[team][newName] = players[team][oldName]; // Copy the value
          delete players[team][oldName];
        }
      }
    }, 0);
  });
  const foulButton = player.querySelector("button");
  const foulCounterHtml = player.querySelector("[data-player-fouls]");
  let foulCount = "";
  foulButton.addEventListener("click", (_) => {
    if (newName.length === 0) {
      assignFoul(oldName, team, foulCounterHtml);
      foulCount = players[team][oldName];
      kickPlayer(foulButton, foulCount);
    } else {
      assignFoul(newName, team, foulCounterHtml);
      foulCount = players[team][newName];
      kickPlayer(foulButton, foulCount);
    }
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

newQuarterBtn.addEventListener("click", (_) => {
  if (currentQuarter === 0) {
    const video = document.querySelector("video");

    const playFromTime = (startTime) => {
      video.currentTime = startTime; // Set the starting time
      video.play(); // Play the video from that time
    };
    video.style.display = "block"; // Show the video
    playFromTime(46);

    video.addEventListener("ended", () => {
      video.style.display = "none"; // Hide the video again
    });
    document.querySelectorAll("button").forEach((button) => {
      button.display = true;
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
    alert(`Varžybos baigtos ${getTime()}!`);
    quarter.innerText = currentQuarter;
  }
});

newGame.addEventListener("click", (_) => {
  init();
});
