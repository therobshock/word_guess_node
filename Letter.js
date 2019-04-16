var Letter = function(char) {
    this.letter = char;
    this.correct = false;
    this.charDisplay = function(){
        // if this.correct is true then display this.letter else display "_"
        if (this.correct) {
            return this.letter;
        } else if (this.letter === " ") {
            return " ";
        } else {
            return "_";
        }
    };
    this.letterGuess = function(guess) {
        // if user guess = this.letter return this.correct = true
        if (guess === this.letter || this.letter === " ") {
            return this.correct = true;
        } 
    }
};

module.exports = Letter;