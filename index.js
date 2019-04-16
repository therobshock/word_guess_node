var inquirer = require("inquirer");

var Word = require("./Word.js");

var wordList = ["star wars", "lord of the rings", "avengers", "scott pilgrim", "rick and morty", "futurama"];
var newWord;
var guessesLeft = 10;

gameOpen();

function gameOpen(){
    console.log
    ("\nWelcome to the Word Guess Game! \nGuess a correct letter and reveal the word \nIf you miss you lose a guess");
    console.log("You have " + guessesLeft + " guesses per word");
    console.log("Are you ready?\n");

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
        var lettersCorrect = 1;

        for (var x in newWord.letters) {

            var wordLetter = newWord.letters[x].letter;
            var letterIsGuessed = newWord.letters[x].correct;

            newWord.letters[x].letterGuess(guess);

            if (guess != wordLetter) {
                wrongGuess--;
            }

            if (letterIsGuessed) {
                lettersCorrect++;
            }
        };

        if (wrongGuess === 0) {
            guessesLeft--;
            console.log("\nINCORRECT!");
            console.log("You have " + guessesLeft + " guesses left");
        } else {
            console.log("\nCORRECT!");
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
    console.log("\n" + text, "\n"); 
}

function gameWon(){
    console.log("You got it!", newWord.word, "\n");
    gameOver();
}

function gameLost() {
    console.log("\nOut of guesses! The word is " + newWord.word, "\n");
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
            console.log("\nThanks for playing!")
        }
    })
};
