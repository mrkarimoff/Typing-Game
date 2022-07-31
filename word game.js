let wordBar = document.querySelector(".word-bar");
let Inp = document.getElementById("inp");
let timePlace = document.getElementById("time-place");
let playBtn = document.getElementById("play-btn");
let pauseBtn = document.getElementById("pause-btn");
let levelPlace = document.getElementById("level-place");
let modalBack = document.querySelector(".modal-back");
let levelCont = document.querySelector(".level-cont");
let scoreCont = document.querySelector(".score-cont");
let interval;
let Level = "Easy";
let word;
let Time = 60;
let score = 0;
let isPauseClicked = false;
let newEasyRecord = JSON.parse(localStorage.getItem("easyRecord"));
let newMediumRecord = JSON.parse(localStorage.getItem("mediumRecord"));
let newHardRecord = JSON.parse(localStorage.getItem("hardRecord"));
let easyRecord = newEasyRecord ? newEasyRecord : [0];
let mediumRecord = newMediumRecord ? newMediumRecord : [0];
let hardRecord = newHardRecord ? newHardRecord : [0];

let data = [
  "Apple",
  "Hello",
  "World",
  "Beautiful",
  "Rock",
  "Paper",
  "Scissor",
  "sailboat",
  "plank",
  "hotel",
  "letter",
  "somersault",
  "hovercraft",
  "Advertisement",
  "devious",
  "Darkness",
  "son-in-law",
  "Organization",
  "fad",
  "LOL",
  "Bodring",
  "prank",
  "guitar",
  "Mortified",
  "Mirfayz",
  "Karimov",
  "neutron",
  "Compromise",
  "wish",
  "programmer",
  "IELTS",
];
let words = data[Math.floor(Math.random() * data.length)];
draw();

function draw() {
  words = data[Math.floor(Math.random() * data.length)];
  wordBar.innerHTML = `
            <p>${words}</p>
            `;
}

function changeWord() {
  if (Inp.value === words) {
    draw();
    Inp.value = "";
    score += 1;
  }
}

function getOption() {
  let selectBox = document.getElementById("select-box");
  let option = selectBox.options[selectBox.selectedIndex];

  switch (option.value) {
    case "easy":
      Time = 60;
      levelPlace.innerText = `Level: Easy`;
      Level = option.text;
      break;
    case "medium":
      Time = 30;
      levelPlace.innerText = `Level: Medium`;
      Level = option.text;
      break;
    case "hard":
      Time = 15;
      levelPlace.innerText = `Level: Hard`;
      Level = option.text;
      break;
    default:
      Time = 60;
      levelPlace.innerText = `Level: Easy`;
      break;
  }
}

function startGame() {
  playBtn.setAttribute("disabled", "disabled");
  Inp.removeAttribute("disabled");
  pauseBtn.removeAttribute("disabled", "disabled");
  timePlace.innerText = `Time: ${Time}`;
  interval = setInterval(function () {
    if (Time >= 0) {
      if (Time === 0) {
        showModal();
      }
      timePlace.innerText = `Time: ${Time}`;
      --Time;
    }
  }, 1000);
}

function showModal() {
  Inp.setAttribute("disabled", "disabled");
  levelCont.innerHTML = `<h2>Level:&nbsp;</h2><h2>${Level}</h2>`;
  clearInterval(interval);
  interval = "";
  Inp.value = "";
  getOption();
  timePlace.innerText = `Time: `;
  playBtn.removeAttribute("disabled");
  pauseBtn.setAttribute("disabled", "disabled");

  switch (Level) {
    case "Easy":
      if (score > Math.max(...easyRecord)) {
        easyRecord.push(score);
        localStorage.setItem("easyRecord", JSON.stringify(easyRecord));
      }
      scoreCont.innerHTML = `<p>Record: ${Math.max(...easyRecord)}</p><p>Score: ${score}</p>`;
      break;
    case "Medium":
      if (score > Math.max(...mediumRecord)) {
        mediumRecord.push(score);
        localStorage.setItem("mediumRecord", JSON.stringify(mediumRecord));
      }
      scoreCont.innerHTML = `<p>Record: ${Math.max(...mediumRecord)}</p><p>Score: ${score}</p>`;
      break;
    case "Hard":
      if (score > Math.max(...hardRecord)) {
        hardRecord.push(score);
        localStorage.setItem("hardRecord", JSON.stringify(hardRecord));
      }
      scoreCont.innerHTML = `<p>Record: ${Math.max(...hardRecord)}</p><p>Score: ${score}</p>`;
      break;
  }
  modalBack.classList.toggle("active");
  score = 0;
}

function pauseGame() {
  if (isPauseClicked) {
    pauseBtn.innerText = "Pause";
    startGame();
    isPauseClicked = false;
  } else {
    pauseBtn.innerText = "Resume";
    Inp.setAttribute("disabled", "disabled");
    clearInterval(interval);
    isPauseClicked = true;
  }
}
