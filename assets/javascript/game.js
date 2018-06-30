var i = 0;
var txt = 'Hello! Welcome to the CDG, Collaborative Diagnosis Game. Here you will work with a doctor to help diagnosis patient cases. You will be guessing letters to solve the diagnosis, but each patient is deathly ill. Each incorrect letter you guess is a failed treatment for the patient. The patient will die within 13 incorrect letter guesses. By that time the disease will have mutated or progressed to the point of no return. Use your powers wisely.';
var speed = 30;

function typeWriter() {
    if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
    }
}

var chosenWord = "";
var num = 0;
var placeholders = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 0;
var guessesLeft = 13;
var wordList = ["malaria", "hepatitis", "dengue", "tuberculosis", "cancer", "influenza", "pneumonia", "alzheimer", "diabetes", "septicemia", "cancer", "Asthma", "bronchitis", "chlamydia", "cowpox", "ebola", "gerd", "hiv", "syphilis"]
const allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

document.getElementById('wins').innerHTML = winCounter;
document.getElementById('loses').innerHTML = lossCounter; 

function startGame() {

    wrongGuesses = []; 
    guessesLeft = 13; 
    placeholders = []; 

    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    lettersInChosenWord = chosenWord.split("");
    num = lettersInChosenWord.length;

    for (var i = 0; i < num; i++) {
        placeholders.push("_");
    }

    document.getElementById('placeholder').innerHTML = placeholders.join(" ");
    document.getElementById('treatments-left').innerHTML = guessesLeft;

}

function checkLetters(letter) {

    var letterInWord = false; 

    for (var i = 0; i < num; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true; 
        }
    }

    if (letterInWord) {
        for (var i = 0; i < num; i++) {
            if (chosenWord[i] === letter) {
                placeholders[i] = letter; 
            }
        }
    } else {
        
        allLetters.forEach(function(element) {
            if (letter == element) {
                guessesLeft --;
                wrongGuesses.push(letter); 
            }
        });
        
    }

}

function roundComplete() {
    
    document.getElementById('placeholder').innerHTML = placeholders.join(" ");
    document.getElementById('treatments-left').innerHTML = guessesLeft;
    document.getElementById('wrong-guess').innerHTML = wrongGuesses.join(" ");

    if (lettersInChosenWord.join(" ") == placeholders.join(" ")) { //to check to see if user guesses all the letters in a word
        winCounter++; 

        alert("\n \nYou saved the patient with " + chosenWord + ". Onward to the next Patient."); 

        document.getElementById('wins').innerHTML = winCounter;

        startGame(); //restart the game

    } else if (guessesLeft === 0) { //no more guesses left
        lossCounter++;

        document.getElementById('loses').innerHTML = lossCounter; 
        document.getElementById('wrong-guess').innerHTML = ""; 
        
        alert("\n \nThe patient's disease has progressed so far along that treatment is no longer useful. We lost the patient to the disease");
        
        startGame(); //restart the game
    }

}

startGame();

document.onkeydown = function(event) {
    
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); 

    checkLetters(letterGuessed);
    roundComplete(); //to check if the user won or lost

}




