var inquirer = require("inquirer"); // inquirer for user prompts in node

var Word = require("./Word.js"); // file containing constructor that stores info and functions for the word

var wordList = ["star wars", "lord of the rings", "avengers", "scott pilgrim", "rick and morty", "futurama"]; //array of word choices
var newWord; // declaring thse variable gloabal for smoothness
var guessesLeft = 10;
var lettersCorrect = 0;

gameOpen();

function gameOpen(){ //logs game introduction and prompts for game start
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

function gameStart() { // sets the number of guesses and calls functions for word and gameplay
    guessesLeft = 10;

    wordPick();
    playGame();
};

function wordPick(){ 
    var index = getRanInt(0, wordList.length); // gets a random number to index the wordList array
    newWord = new Word(wordList[index]); //uses the indext to create new Word constructor
    newWord.lettersArr(); //calls function to set letters to the Letter constructor
}

function getRanInt(min, max){ //function for random integer
    return Math.floor(Math.random() * max) + min;
}

function playGame() {
    wordDisplay(newWord.letters); //passes the letters of the Word constructor into a display function

    inquirer.prompt( // promps for a letter guess
        {
            message: "Make a letter guess",
            name: "guess"
        }

    ).then(function(response) {
        var guess = response.guess.toLowerCase(); //response to lower case and stores in variable
        var wrongGuess = newWord.letters.length; //sets a variable that will decrement to zero if user prompt does not match any letters
        lettersCorrect = 0; // sets a variable that will increment whenever a guess is correct
        
        for (var x = 0; x < newWord.letters.length; x++) {

            newWord.letters[x].letterGuess(guess); //loops through function to compare guessed letter to letters in word

            var wordLetter = newWord.letters[x].letter; //stores letter to be compared
            var letterIsGuessed = newWord.letters[x].correct; //checks boolean value in Word constructor

            if (guess != wordLetter) { //if no letters match decrement by one
                wrongGuess--;
            }

            if (letterIsGuessed) { //if boolean is true increment by one
                lettersCorrect++;
            }
        };

        if (wrongGuess === 0) { //when no letters match, variable is zero
            guessesLeft--; //decrement number of guesses by one then log message
            console.log("\x1b[31m\nINCORRECT!");
            console.log("You have " + guessesLeft + " guesses left\x1b[0m");
        } else {
            console.log("\x1b[32m\nCORRECT!\x1b[0m");
        }

        if (guessesLeft === 0) { //if no more guesses, call function for a lost game
            gameLost();

        } else if (lettersCorrect === newWord.letters.length) { // if all letters have been guess, game is won, word is displayed
            wordDisplay(newWord.letters);
            gameWon();

        } else { //otherwise another turn
            playGame();
        }
    })
};

function wordDisplay(word) {// function that displays letter spaces and any letter that have been guessed correct
    var text = "";
    for (var x = 0; x < word.length; x++) {
        var character = word[x].charDisplay(); //takes in letters of word to be displayed and calls function from Letter constructor
        text += character + " ";
    };
    console.log("\x1b[34m\n" + text, "\n\x1b[0m"); // then displays either "_" or letter if guessed
}

function gameWon(){ //displays message and calls gome ending function
    console.log("You got it!\x1b[32m", newWord.word, "\n\x1b[0m");
    gameOver();
}

function gameLost() { //displays message and calls game ending function
    console.log("\x1b[31m\nOut of guesses!\x1b[0m", "The word is\x1b[34m",  newWord.word, "\x1b[0m\n");
    gameOver();
}

function gameOver() { //prompts user to choose whether or not to play game again
    inquirer.prompt(
      {
          type: "confirm",
          message: "Play Again?",
          name: "playAgain",
          default: true
      }  
    ).then(function(response){
        if (response.playAgain) {// ture, game start function called
            gameStart();
        } else {
            console.log("\x1b[35m\nThanks for playing!\x1b[0m"); // else ending message displayed, node exits
        }
    })
};
