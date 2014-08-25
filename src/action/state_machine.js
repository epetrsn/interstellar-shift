function StateQueue() {
	this.states = [];
	this.currentState = null;
};

StateQueue.prototype.add = function () {};
StateQueue.prototype.remove = function () {};
StateQueue.prototype.process = function () {
	var currentState = this.currentState || this.getNextState();
};
StateQueue.prototype.getNextState = function () {
	
};