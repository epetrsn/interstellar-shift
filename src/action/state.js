function State(player) {
	this.player = player;
	this.isStarted = false;
	this.isDone = false;
	this.startTime = 0;
	this.processCount = 0;
	this.canMultitask = false;
}

State.prototype.enter = function () {
	// Mark active
	this.isStarted = true;
	this.onEnter();
};
State.prototype.onEnter = function () {
	// Implement in subclass
};
State.prototype.process = function () {
	if (this.isStarted && !this.isDone) {
		this.onProcess();
		this.processCount++;
	}
};
State.prototype.onProcess = function () {
	// Implement in subclass
};
State.prototype.exit = function (success) {
	// Mark finished
	this.isDone = true;
	this.onExit(success);
	// Remove from this.player.queue
};
State.prototype.onExit = function (success) {
	// Implement in subclass
};

/*
 * States
 */
function TestState(player) {
	State.call(this, player);
}

TestState.prototype.onEnter