var inquirer = require("inquirer");

var Word = require("./Word.js");

var wordList = ["star wars", "lord of the rings", "avengers", "scott pilgrim", "rick and morty", "futurama"];
var newWord;
var guessesLeft = 10;
var lettersCorrect = 0;

gameOpen();

function gameOpen(){
    console.log
    ("\x1b[34m\nWelcome to the Word Guess Game! \nGuess a correct letter and reveal the word \nIf you miss you lose a guess\x1b[0m");
    console.log("\x1b[32mYou have " + guessesLeft + " guesses per word\x1b[0m");
    console.log("\x1b[31mAre you ready?\n\x1b[0m");

    inquirer.prompt(
        {
            message: "Press ENTER to begin",
            name: "start"
        }
    ).then(gameStart);
}

function gameStart() {
    guessesLeft = 10;

    wordPick();
    playGame();
};

function wordPick(){
    var index = getRanInt(0, wordList.length);
    newWord = new Word(wordList[index]);
    newWord.lettersArr();
}

function getRanInt(min, max){
    return Math.floor(Math.random() * max) + min;
}

function playGame() {
    wordDisplay(newWord.letters);

    inquirer.prompt(
        {
            message: "Make a letter guess",
            name: "guess"
        }

    ).then(function(response) {
        var guess = response.guess.toLowerCase();
        var wrongGuess = newWord.letters.length;
        lettersCorrect = 0;
        
        for (var x = 0; x < newWord.letters.length; x++) {

            newWord.letters[x].letterGuess(guess);

            var wordLetter = newWord.letters[x].letter;
            var letterIsGuessed = newWord.letters[x].correct;

            if (guess != wordLetter) {
                wrongGuess--;
            }

            if (letterIsGuessed) {
                lettersCorrect++;
            }
        };

        if (wrongGuess === 0) {
            guessesLeft--;
            console.log("\x1b[31m\nINCORRECT!");
            console.log("You have " + guessesLeft + " guesses left\x1b[0m");
        } else {
            console.log("\x1b[32m\nCORRECT!\x1b[0m");
        }

        if (guessesLeft === 0) {
            gameLost();

        } else if (lettersCorrect === newWord.letters.length) {
            wordDisplay(newWord.letters);
            gameWon();

        } else {
            playGame();
        }
    })
};

function wordDisplay(word) {
    var text = "";
    for (var x = 0; x < word.length; x++) {
        var character = word[x].charDisplay();
        text += character + " ";
    };
    console.log("\x1b[34m\n" + text, "\n\x1b[0m"); 
}

function gameWon(){
    console.log("You got it!\x1b[32m", newWord.word, "\n\x1b[0m");
    gameOver();
}

function gameLost() {
    console.log("\x1b[31m\nOut of guesses!\x1b[0m", "The word is\x1b[34m",  newWord.word, "\x1b[0m\n");
    gameOver();
}

function gameOver() {
    inquirer.prompt(
      {
          type: "confirm",
          message: "Play Again?",
          name: "playAgain",
          default: true
      }  
    ).then(function(response){
        if (response.playAgain) {
            gameStart();
        } else {
            console.log("\x1b[35m\nThanks for playing!\x1b[0m");
        }
    })
};
