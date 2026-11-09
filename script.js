// made by: Sebastian
let words = ["pneumonoultramicroscopicsilicovolcanoconiosis", "via", "university", "html", "browser", "hyperlink", "header", "footer", "doctype", "flexbox", "cat", "sofus"];
let secretWord = "";
let guessed = [];
let lives = 6;

// start a new game
function newGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessed = [];
    lives = 6;
    document.getElementById("message").innerHTML = "";
    document.getElementById("lives").innerHTML = "Lives: " + lives;

    // back to the empty picture
    document.getElementById("hangman").src = "images/hangman-0.svg";

    makeButtons();
    showWord();
}

// made by: Yordan
// make a button for every letter
function makeButtons() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let letters = document.getElementById("letters");
    letters.innerHTML = "";

    for (let i = 0; i < alphabet.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = alphabet[i];
        btn.className = "letter";
        btn.onclick = function () {
            guess(alphabet[i], btn);
        };
        letters.appendChild(btn);
    }
}

// made by: Alexandru
// show the word with _ for letters not found
function showWord() {
    let text = "";
    for (let i = 0; i < secretWord.length; i++) {
        if (guessed.includes(secretWord[i])) {
            text = text + secretWord[i];
        } else {
            text = text + "_";
        }
    }
    document.getElementById("word").innerHTML = text;

    // check if player won
    if (!text.includes("_")) {
        document.getElementById("message").innerHTML = "You won!";
        endGame();
        addWin();
    }
}

// made by: Alexandru
function guess(letter, btn) {
    btn.disabled = true;    
    guessed.push(letter);

    if (!secretWord.includes(letter)) {
        lives--;
        document.getElementById("lives").innerHTML = "Lives: " + lives;

        // change the picture, 1 wrong = hangman-1 and so on
        let wrong = 6 - lives;
        document.getElementById("hangman").src = "images/hangman-" + wrong + ".svg";
    }

    if (lives == 0) {
        document.getElementById("message").innerHTML = "You lost! The word was " + secretWord;
        document.getElementById("word").innerHTML = secretWord;
        endGame();
        addLoss();
    } else {
        showWord();
    }
}

// made by: Yordan
// turn off all buttons when game is over
function endGame() {
    let buttons = document.getElementsByClassName("letter");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

// made by: Luchiano
// save score in localStorage
function addWin() {
    let wins = Number(localStorage.getItem("wins")) + 1;
    localStorage.setItem("wins", wins);
    showScore();
}

function addLoss() {
    let losses = Number(localStorage.getItem("losses")) + 1;
    localStorage.setItem("losses", losses);
    showScore();
}

function showScore() {
    document.getElementById("wins").innerHTML = Number(localStorage.getItem("wins"));
    document.getElementById("losses").innerHTML = Number(localStorage.getItem("losses"));
}

function resetScore() {
    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
    showScore();
}

// made by: Sebastian
// buttons and start the first game
document.getElementById("newGame").onclick = newGame;
document.getElementById("reset").onclick = resetScore;

showScore();
newGame();
