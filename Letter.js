var Letter = function(char) { //takes in a character string and sets it constructor
    this.letter = char;
    this.correct = false;
    this.charDisplay = function(){
        // if this.correct is true then display this.letter else display "_"
        if (this.correct) {//displays based on boolean value
            return this.letter;
        } else if (this.letter === " ") {
            return " ";
        } else {
            return "_";
        }
    };
    this.letterGuess = function(guess) {
        if (guess === this.letter || this.letter === " ") { //sets boolean value if user matches letter or if letter is a space
            return this.correct = true;
        } 
    }
};

module.exports = Letter;