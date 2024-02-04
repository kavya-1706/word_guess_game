function instructions(){
    document.getElementById("start").style.display = "none";
    document.getElementById("instructions").style.display = "block";
}
function back(){
    document.getElementById("start").style.display = "block";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("game").style.display = "none";

}
function easyMode(){
    document.getElementById("start").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    startGame(10)
}
function hardMode(){
    document.getElementById("start").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    startGame(5)
}


let words = ["apple",'banana',"cat", "dog", "bird","lion", "deer", "train", "truck", "plane","maple", "palm", "willow", "bamboo","moon", "star", "sun", "rain", "snow", "wind", "book", "pen", "desk", "chair", "lamp", "clock"];
let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];    
let wordLength = randomWord.length;
let dashes = "";
for (let i = 0; i < wordLength; i++) {
            dashes += "_ ";
        }

document.getElementById("word-display").innerHTML = "<p>" + dashes + "</p>";

function checkGuess() {
    
    var userLetter = document.getElementById("guess").value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    if (userLetter.length !== 1 || !/^[a-z]$/.test(userLetter)) {
        clearFeedbackMessages();
        var feedbackArea = document.getElementById("feedback");
        var feedbackMessage = document.createElement("p");
        feedbackMessage.textContent = "Please enter a single letter from A to Z.";
        feedbackArea.appendChild(feedbackMessage);
        return;  
    }
    document.getElementById("guess").value = "";
    if (isLetterAlreadyGuessed(userLetter)) {
        clearFeedbackMessages();
        var feedbackArea = document.getElementById("feedback");
        var feedbackMessage = document.createElement("p");
        feedbackMessage.textContent = "You've already guessed the letter '" + userLetter + "'. Try a different letter!";
        feedbackArea.appendChild(feedbackMessage);
        return; 
    }
    updateGuessedLetters(userLetter);
    attemptsLeft--;
    updateAttemptsLeft();
    
    var isLetterInWord = false;
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === userLetter) {
            
            var dashesArray = document.getElementById("word-display").getElementsByTagName("p")[0].innerText.split(" ");
            dashesArray[i] = userLetter;
            document.getElementById("word-display").getElementsByTagName("p")[0].innerText = dashesArray.join(" ");
            isLetterInWord = true;
        }
    }
    if (document.getElementById("word-display").getElementsByTagName("p")[0].innerText.indexOf("_") === -1) {
        
        gameOver(true);
        return;
    }

    if (attemptsLeft === 0) {
        
        gameOver(false);
        return;
    }


    var feedbackArea = document.getElementById("feedback");
    feedbackArea.innerHTML = "";

    var feedbackMessage = document.createElement("p");
    if (isLetterInWord) {
        feedbackMessage.textContent = "Good guess! The letter '" + userLetter + "' is in the word.";
    } else {
        feedbackMessage.textContent = "Sorry, the letter '" + userLetter + "' is not in the word. Try again!";
    }
    feedbackArea.appendChild(feedbackMessage);
    
}

let attemptsLeft=0;
function startGame(totalAttempts){
    document.getElementById("game").style.display = "block";
    document.getElementById("attempts-total").textContent = "Total Attempts: " + totalAttempts;

    attemptsLeft = totalAttempts;
    updateAttemptsLeft();
    selectRandomWord();
    clearLettersGuessed();
    resetDisplayedWord();
    clearFeedbackMessages();
    document.getElementById("guess").disabled = false;
}
function selectRandomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex];
}
function clearLettersGuessed() {
    document.getElementById("guessed-letters").textContent = "";
}
function resetDisplayedWord() {
    let wordLength = randomWord.length;
    let dashes = "";
    for (let i = 0; i < wordLength; i++) {
        dashes += "_ ";
    }
    document.getElementById("word-display").innerHTML = "<p>" + dashes + "</p>";
}

function clearFeedbackMessages() {
    document.getElementById("feedback").innerHTML = "";
}


function updateAttemptsLeft() {
   
    document.getElementById("attempts-left").textContent = "Attempts Left: " + attemptsLeft;
}
function gameOver(isWin) {
    var resultMessage = document.createElement("p");
    if (isWin) {
        resultMessage.textContent = "Congratulations! You've guessed the word. The word was- "+ randomWord + "." + " Game over!";
    } else {
        resultMessage.textContent = "Sorry, you've run out of attempts. The word was- "+ randomWord + "." + " Game over!";
    }
    document.getElementById("feedback").appendChild(resultMessage);
    document.getElementById("guess").disabled = true;
}

function updateGuessedLetters(letter) {
    var guessedLettersElement = document.getElementById("guessed-letters");
    guessedLettersElement.textContent += letter + ", ";
}
function isLetterAlreadyGuessed(letter) {
    var guessedLetters = document.getElementById("guessed-letters").textContent.replace(/,\s*$/, ''); // Remove trailing comma and spaces
    return guessedLetters.includes(letter);
}
