/*
 * Game State
 */

function GameState() {
		this.map = new Map();
    this.players = [];
    this.turn = 0;
    this.phase = 0;
    this.phaseNames = ["Move", "Attack", "Spawn"];
    
}

GameState.prototype.getCurrentPlayer = function () {
    return this.players[this.turn];
};

GameState.prototype.getCurrentPhaseName = function () {
    return this.phaseNames[this.phase];
};