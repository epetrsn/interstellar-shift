/*
 * Game State
 */

function GameState() {
	// Game Data
	this.map = new Map();
  this.players = [];
  // Game State
  this.turn = 0;
  this.phase = 0;
  // Moved to GameConst
  // this.phaseNames = ["Move", "Attack", "Spawn"];
    
}

GameState.prototype.getCurrentPlayer = function () {
    return this.players[this.turn];
};

GameState.prototype.getCurrentPhaseName = function () {
    return GameConst.TURN_PHASES[this.phase];
};