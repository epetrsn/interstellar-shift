/*
 * Player State Prototype
 * 
 * Contains state data for a player. Players need a strategy to determine code to run otaht player's turn
 */

function Player(strategy) {
	this.strategy = strategy;
    this.livingUnits = [];
    this.isTurn = false;
    this.isMovingPhase = false;
    this.producerUnits = 0;
}

Player.prototype.countProducerUnits = function () {
    var count;
    
    //Count up producer units that exist in this.livingUnits
    
    this.producerUnits = count;
    return count;
};
    
Player.prototype.beginTurn = function () {
    this.isMovingPhase = true;
    this.isTurn = true;
};

Player.prototype.endMovingPhase = function () {
    this.isMovingPhase = false;
};

Player.prototype.endTurn = function () {
    this.isMovingPhase = false;
    this.isTurn = false;
};

// Does this need input context?
Player.prototype.onTurn = function () {

};