/*
 * Renderable Prototype
 */

function Renderable(x, y, width, length) {
	this.canvas;
	this.isAnimating = false;
	this.currentFrame = 0;
	this.animation = null;
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.length = length || 0;
};

Renderable.prototype.render = function () {
	if (!this.canvas || this.width <= 0 || this.height <= 0) {
		return;
	}
	// TODO: Draw to canvas
};

Renderable.prototype.start = function () {
	this.isAnimating = true;
};

Renderable.prototype.pause = function () {
	this.isAnimating = false;
};

Renderable.prototype.stop = function () {
	this.isAnimating = false;
};

Renderable.prototype.reset = function () {
	this.isAnimating = false;
};

Renderable.prototype.goToFrame = function (n) {
};