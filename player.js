/*
 * Player Prototype
 * 
 * Contains state data for a player. Players need a strategy to determine code to run otaht player's turn
 */

function Player(strategy) {
	this.strategy = strategy;
}

// Does this need input context?
Player.prototype.onTurn() {

}