
var Bot = function() {
	this.opponentMoveHistory = '';
	this.markovSequenceLength = [6, 5, 4, 3, 2];
	this.winRatio = 0;
	this.gamesPlayed = 0;
	this.moveLetterArray = {1:"R", 2:"P", 3:"S", 4:"L", 5:"K"};
};

Bot.prototype.throwMove = function() {
	for (var i = 0; i < this.markovSequenceLength.length; i++) {
		if(this.opponentMoveHistory.length > this.markovSequenceLength[i]) {
			var move = this.findMove(this.markovSequenceLength[i]);

			if(move) {
				return move;
			}
		}
	}

	return this.getRandomMove();
};

Bot.prototype.trumps = function(preditedHumanMove) {
	return winMatrix[preditedHumanMove].indexOf(1);
};


Bot.prototype.getRandomMove = function() {
    return Math.floor(Math.random() * 5) + 1;
};

Bot.prototype.findMove = function(sequenceLength) {
	var patternFreq       = this.getPatternFreq(sequenceLength);
	var maxFreq           = Math.max.apply(Math, patternFreq);
	var minFreq           = Math.min.apply(Math, patternFreq);
	var preditedHumanMove = patternFreq.indexOf(maxFreq);

	if(maxFreq === minFreq) {
		return false;
	}

	return this.trumps(preditedHumanMove);
};

Bot.prototype.addResult = function(result, opponentMove) {
	this.winRatio += result;
	this.gamesPlayed++;

	this.opponentMoveHistory = this.moveLetterArray[opponentMove] + this.opponentMoveHistory;
};

Bot.prototype.getPatternFreq = function(sequenceLength) {
	var patternFreq = [0, 0, 0, 0, 0];
	var subString   = this.opponentMoveHistory.substr(0, sequenceLength);

	for(key in this.moveLetterArray) {
		patternFreq[key] = this.opponentMoveHistory.split(this.moveLetterArray[key] + subString).length - 1;
	}

    return patternFreq;
}
