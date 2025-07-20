console.log("Welcome to Tic Tac Toe");

let gameEnd = new Audio("GameEnds.mp3");
let turn = "X";
let gameover = false;
let vsBot = null; // will be true if playing with bot, false if with player

// Scoreboard variables
let scoreX = 0;
let score0 = 0;

// Get score elements
const scoreXElement = document.getElementById("scoreX");
const score0Element = document.getElementById("score0");

// Function to update the displayed scores
const updateScores = () => {
    scoreXElement.innerText = scoreX;
    score0Element.innerText = score0;
};

// Wait until user selects mode
const modeSelect = document.getElementById("modeSelect");
modeSelect.addEventListener("change", () => {
    const selectedValue = modeSelect.value;
    vsBot = selectedValue === "bot";
    
    scoreX = 0;
    score0 = 0;
    updateScores();
    resetGame();
    document.querySelector(".info").innerText = "Turn for " + turn;
});

// Change Turn Function
const changeTurn = () => turn === "X" ? "0" : "X";

// Win Check
const checkWin = () => {
    const boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,0,5,0],
        [3,4,5,0,15,0],
        [6,7,8,0,25,0],
        [0,3,6,-10,15,90],
        [1,4,7,0,15,90],
        [2,5,8,10,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            gameover = true;
            gameEnd.play();
            document.querySelector('.imgInfo').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.width = "30vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;

            // Increment score of the winner
            if (boxtext[e[0]].innerText === "X") {
                scoreX++;
            } else {
                score0++;
            }
            updateScores(); // Update the displayed scores
        }
    });
};

// Bot Logic
const botMove = () => {
    if (gameover) return;
    let emptyBoxes = Array.from(document.getElementsByClassName("box")).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) {
        // Handle a draw if no empty boxes and no winner
        if (!gameover) {
            document.querySelector(".info").innerText = "It's a Draw!";
            gameover = true;
        }
        return;
    }

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    let boxtext = randomBox.querySelector(".boxtext");

    setTimeout(() => {
        boxtext.innerText = turn;
        checkWin();
        if (!gameover) {
            turn = changeTurn();
            document.querySelector(".info").innerText = "Turn for " + turn;
        }
    }, 500); 
    // slight delay for bot move
};


let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (vsBot === null) {
            alert("Please select a game mode first.");
            return;
        }

        if (boxtext.innerText === '' && !gameover) {
            boxtext.innerText = turn;
            checkWin();
            
            if (!gameover && Array.from(boxes).every(box => box.querySelector('.boxtext').innerText !== '')) {
                document.querySelector(".info").innerText = "It's a Draw!";
                gameover = true;
            }

            if (!gameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;

                if (vsBot && turn === "0") {
                    botMove(); 
                }
            }
        }
    });
});

// Reset Logic
function resetGame() {
    let boxtexts = document.querySelectorAll('.boxtext');
    boxtexts.forEach(element => {
        element.innerText = "";
    });

    turn = "X";
    gameover = false;

    document.getElementsByClassName("info")[0].innerText = vsBot === null
        ? "Please select game mode to start"
        : "Turn for " + turn;

    document.querySelector('.imgInfo').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
}

document.getElementById("reset").addEventListener('click', resetGame);

// Initial info
document.querySelector(".info").innerText = "Please select game mode to start";
document.getElementById("resetScoresBt").addEventListener('click', () => {
    scoreX = 0;
    score0 = 0;
    updateScores();
});


