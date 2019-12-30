// Variables and Cached Elements
const rock = "rock";
const paper = "paper";
const scissors = "scissors";
const lizard = "lizard";
const spock = "spock";

const OPTIONS = {
    rock: {
        beats: ["scissors", "lizard"],
        imgUrl: "../Images/rock.png"
    },
    paper: {
        beats: ["rock", "spock"],
        imgUrl: "../Images/paper.png"
    },
    scissors: {
        beats: ["paper", "lizard"],
        imgUrl: "../Images/scissors.png"
    },
    lizard: {
        beats: ["paper", "spock"],
        imgUrl: "../Images/lizard.png"
    },
    spock: {
        beats: ["rock", "scissors"],
        imgUrl: "../Images/spock.png"
    }
};

const allOptions = ["rock", "paper", "scissors", "lizard", "spock"];

const soundPlayer = new Audio();

const sounds = {
    beepSound: "../Sounds/BeepSound.wav",
    goSound: "../Sounds/GoSound.wav"
};

let scores, results, winner, playerChoice, count;

const rulesBtn = document.getElementById("rules");
const goBtn = document.getElementById("go");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const lizardBtn = document.getElementById("lizard");
const spockBtn = document.getElementById("spock");
const msg = document.getElementById("msg");
const gamerScore = document.getElementById("gamer-score");
const computerScore = document.getElementById("computer-score");
const gamerHand = document.getElementById("gamer-hand");
const computerHand = document.getElementById("computer-hand");
const allBtn = document.querySelector("button");

//event listeners

//rulesBtn.addEventListener("click", TODO);
goBtn.addEventListener("click", playHand());
rockBtn.addEventListener("click", gamerSelection("rock"));
paperBtn.addEventListener("click", gamerSelection("paper"));
scissorsBtn.addEventListener("click", gamerSelection("scissors"));
lizardBtn.addEventListener("click", gamerSelection("lizard"));
spockBtn.addEventListener("click", gamerSelection("spock"));

// functions

init();

function init() {
    scores = {
        gamer: 0,
        computer: 0,
        tie: 0
    };
    results = {
        gamer: rock,
        computer: rock
    };
    winner = null;
    playerChoice = null;
    count = 0;
    render();
}

function render() {
    //render imgs
    gamerHand.style.backgroundImage = `url(${OPTIONS[results.gamer].imgUrl})`;
    // gamerHand.classList.add = "show";
    computerHand.style.backgroundImage = `url(${
        OPTIONS[results.computer].imgUrl
    })`;
    // computerHand.classList.add = "show";
    //render msg
    if (winner) {
        msg.classList.add = "show";
        if (winner === "tie") {
            msg.textContent = "TIE";
            goBtn.style.display = "none";
        } else {
            msg.textContent = `${winner} WINS`;
            goBtn.style.display = "none";
        }
    }
    //render scores
    gamerScore.textContent = scores.gamer;
    computerScore.textContent = scores.computer;
    addClassToBtn();
}

function addClassToBtn() {
    if (playerChoice === "rock") renderSelectedBtn(rockBtn);
    if (playerChoice === "paper") renderSelectedBtn(paperBtn);
    if (playerChoice === "scissors") renderSelectedBtn(scissorsBtn);
    if (playerChoice === "lizard") renderSelectedBtn(lizardBtn);
    if (playerChoice === "spock") renderSelectedBtn(spockBtn);
}

function renderSelectedBtn(btn) {
    allBtn.classList.remove("selected");
    btn.classList.add("selected");
}

function playHand() {
    countdown(start);
}

function countdown(cb) {
    let count = 3;
    playSound("beepSound");
    renderCount(count);
    let timer = setInterval(() => {
        count--;
        if (count) {
            playSound("beepSound");
            msg.classList.add = "show";
            msg.textContent = count;
        } else {
            clearInterval(timer);
            playSound("goSound");
            renderCount(count);
            cb();
        }
    }, 1000);
}

function playSound(name) {
    soundPlayer.src = sounds[name];
    soundPlayer.play();
}

function start() {
    results.gamer = playerChoice || allOptions[Math.floor(Math.random() * 5)];
    results.computer = allOptions[Math.floor(Math.random() * 5)];
    winner = getWinner();
    playerChoice = null;
    scores[winner]++;
    render();
}

function getWinner() {
    return results.gamer === results.computer
        ? "tie"
        : OPTIONS[results.gamer].beats.forEach(
              item => item === results.computer
          )
        ? "gamer"
        : "computer";
}

function renderCount() {
    if (count) {
        msg.classList.add = "show";
        msg.textContent = count;
        goBtn.style.display = "none";
    } else {
        msg.classList.remove = "show";
        goBtn.style.display = "";
        msg.textContent = "";
    }
}

function gamerSelection(hand) {
    console.log("clicked");
    return function() {
        if (playerChoice === hand) {
            playerChoice = null;
        } else {
            playerChoice = hand;
        }
        renderSelectedBtn();
    };
}
