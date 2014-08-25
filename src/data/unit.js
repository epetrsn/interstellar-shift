function Unit(player, mode) {
	this.owner = player;
	this.display = null;
	this.isAlive = true;
	this.mode = mode || GameConst.UNIT_MODES.MOVE;
	// Reset the at the end of each turn
	this.isSelected = false;
	this.canAct = true;
	this.targetLocation = null;
	this.targetMode = null;
	this.location = null;
	// Flag to indicate this may need rerendering
	this.propertyChanged = true;
};

Unit.prototype.changeMode = function (mode) {
	if (this.isAlive && this.canAct && mode !== this.mode) {
		this.canAct = false;
		this.targetMode = mode;
		this.propertyChanged = true;
	}
};

Unit.prototype.changeLocation = function (location) {
	if (this.isAlive && this.canAct && location !== this.location) {
		this.canAct = false;
		this.targetLocation = location;
		this.propertyChanged = true;
	}
};

Unit.prototype.select = function () {
	if (this.isAlive && !this.isSelected) {
		this.isSelected = true;
		this.propertyChanged = true;	
	}
};

Unit.prototype.deselect = function () {
	if (this.isSelected) {
		this.isSelected = false;
		this.propertyChanged = true;	
	}
};

Unit.prototype.confirmAction = function () {
	this.canAct = true;
	this.location = this.targetLocation || this.location;
	this.mode = this.targetMode || this.mode;
	this.targetLocation = null;
	this.targetMode = null;
	// Need this?
	this.propertyChanged = true;
};

Unit.prototype.cancelAction = function () {
	this.canAct = true;
	this.targetLocation = null;
	this.targetMode = null;
	this.propertyChanged = true;
};

Unit.prototype.kill = function () {
	// When unit is killed, its display object should animate then remove itself
	this.isAlive = false;
	this.propertyChanged = true;
}