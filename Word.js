var Letter = require("./Letter.js");

var Word = function(word) {
    // array of "new" Letter object?
    this.word = word;
    this.letters = [];
    this.lettersArr = function() {

        for (i = 0; i < this.word.length; i++) {
           this.letters.push(new Letter(this.word[i]));
        };
    };
};

module.exports = Word;