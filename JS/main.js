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

const beepSound = new Audio("../Sounds/BeepSound.wav");
const goSound = new Audio("../Sounds/GoSound.wav");

let scores, results, winner, playerChoice, count;

const rulesBtn = document.getElementById("rules");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];
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

//event listeners

rulesBtn.addEventListener("click", () => {
    modal.classList.remove("none");
});
closeBtn.addEventListener("click", () => {
    modal.classList.add("none");
});
goBtn.addEventListener("click", playHand);
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
        gamer: "rock",
        computer: "rock"
    };
    winner = null;
    playerChoice = null;
    count = 0;
    render();
}

function render() {
    //render imgs
    gamerHand.style.backgroundImage = `url(${OPTIONS[results.gamer].imgUrl})`;
    computerHand.style.backgroundImage = `url(${
        OPTIONS[results.computer].imgUrl
    })`;
    //render msg
    if (winner) {
        if (winner === "tie") {
            msg.textContent = "TIE";
        } else {
            msg.textContent = `${winner} WINS`;
        }
        setTimeout(() => {
            goBtn.classList.remove("none");
            msg.textContent = "";
        }, 1000);
    }
    //render scores
    gamerScore.textContent = scores.gamer;
    computerScore.textContent = scores.computer;
    renderSelectedBtn();
}

function renderSelectedBtn() {
    rockBtn.classList.remove("selected");
    paperBtn.classList.remove("selected");
    scissorsBtn.classList.remove("selected");
    lizardBtn.classList.remove("selected");
    spockBtn.classList.remove("selected");
    if (playerChoice === "rock") {
        rockBtn.classList.add("selected");
    } else if (playerChoice === "paper") {
        paperBtn.classList.add("selected");
    } else if (playerChoice === "scissors") {
        scissorsBtn.classList.add("selected");
    } else if (playerChoice === "lizard") {
        lizardBtn.classList.add("selected");
    } else if (playerChoice === "spock") {
        spockBtn.classList.add("selected");
    }
}

function playHand() {
    countdown(start);
    goBtn.classList.add("none");
}

function countdown(cb) {
    let count = 4;
    let idx = 0;
    beepSound.play();
    computerHand.style.backgroundImage = `url(${
        OPTIONS[allOptions[idx]].imgUrl
    })`;
    gamerHand.style.backgroundImage = `url(${OPTIONS[allOptions[idx]].imgUrl})`;
    renderCount(count);
    let timer = setInterval(() => {
        count--;
        idx++;
        if (count) {
            computerHand.style.backgroundImage = `url(${
                OPTIONS[allOptions[idx]].imgUrl
            })`;
            gamerHand.style.backgroundImage = `url(${
                OPTIONS[allOptions[idx]].imgUrl
            })`;
            beepSound.play();
            msg.textContent = count;
        } else {
            clearInterval(timer);
            goSound.play();
            renderCount(count);
            cb();
        }
    }, 1000);
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
        : OPTIONS[results.gamer].beats.includes(results.computer)
        ? "gamer"
        : "computer";
}

function renderCount(count) {
    if (count > 0) {
        msg.textContent = count;
        goBtn.classList.add("none");
    } else {
        msg.textContent = "";
    }
}

function gamerSelection(hand) {
    return function() {
        if (playerChoice === hand) {
            playerChoice = null;
        } else {
            playerChoice = hand;
        }
        renderSelectedBtn();
    };
}
