function Unit(player) {
	this.owner = player;
	this.mode = null;
	// Reset the at the end of each turn
	this.isSelected = false;
	this.canAct = true;
	this.targetLocation = null;
	this.targetMode = null;
	this.location = null;
};

Unit.prototype.changeMode = function (mode) {
	if (this.canAct && mode !== this.mode) {
		this.canAct = false;
		this.targetMode = mode;
	}
};

Unit.prototype.changeLocation = function (location) {
	if (this.canAct && location !== this.location) {
		this.canAct = false;
		this.targetLocation = location;
	}
};

Unit.prototype.select = function () {
	this.isSelected = true;
};

Unit.prototype.deselect = function () {
	this.isSelected = false;
};

Unit.prototype.confirmAction = function () {
	this.canAct = true;
	this.location = this.targetLocation || this.location;
	this.mode = this.targetMode || this.mode;
	this.targetLocation = null;
	this.targetMode = null;
};

Unit.prototype.cancelAction = function () {
	this.canAct = true;
	this.targetLocation = null;
	this.targetMode = null;
};