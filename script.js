const secretPhrases = ["never", "you", "that", "bullet", "break"];

let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem (){
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)]
    // document.querySelectorAll(".letters").addEventListener("click", buttonHandler)
    document.querySelectorAll(".letters").forEach(item => item.addEventListener("click", buttonHandler))
    // console.log(test)
    window.addEventListener("keydown", keyhandler)
    console.log(randomItem)
}

function setUnderScores () {
    let splitedWord = randomItem.split("");t
    let mappedWord = splitedWord.map(item => clicked.indexOf(item) >= 0 ? item : "_")
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
}

function checkWon (){
    if (randomItem === result) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "assets/winner.png";
        document.getElementById("clue").innerHTML = `<p>well done, answer: ${randomItem}</p>`

    }
}

function checkLost (){
    if (mistakes === 6) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<p>Answer is: ${randomItem}</p>`
    }
}

function updateHangmanPic (){
    const image = document.getElementById("image").querySelector("img");
    if (mistakes <= 6) {
        image.src = `assets/hangman${mistakes}.png`
    }
}

function letterHandler(letter){
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderScores();
        checkWon();
        End();
    } else if (randomItem.indexOf(letter) === -1){
        mistakes++;
        updateHangmanPic();
        checkLost();
        End();

    }
}

function buttonHandler (event) {
    letterHandler(event.target.id);
}

function keyhandler(event) {
    letterHandler(event.key)
}

function End (){
    if (mistakes == 6) {
        console.log("you lost")
        document.querySelectorAll(".letters").forEach(item => item.removeEventListener("click", buttonHandler))
        window.removeEventListener("keydown", keyhandler)
    } else if (randomItem === result) {
        console.log("you won")
        document.querySelectorAll(".letters").forEach(item => item.removeEventListener("click", buttonHandler))
        window.removeEventListener("keydown", keyhandler)
    }
}


selectRandomItem();
setUnderScores();