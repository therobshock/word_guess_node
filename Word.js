var Letter = require("./Letter.js"); //requires file with Letter constructor

var Word = function(word) {//takes in a string and sets to constructor
    this.word = word;
    this.letters = [];
    this.lettersArr = function() {//puts in array of objects using Letter constructor into above array variable

        for (i = 0; i < this.word.length; i++) {
           this.letters.push(new Letter(this.word[i]));
        };
    };
};

module.exports = Word;