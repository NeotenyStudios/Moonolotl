"use strict";

var vec = require('./vec.js');

var engine = function(config) {
	var that;
	config = config || {};

	this.objects			= [];
	this.hitboxes			= [];
	this.width				= config.width || 1024;
	this.height				= config.height || 720;
	this.targetSpeed		= 20;
	this.timePrecision		= 16;
	this.previousTick		= 0;
	this.nbObjects			= 0;
	this.layers				= {};
	that = this;
	this.gameLoop			= function() {
		var time = (new Date()).getTime();

		if (this.previousTick + (1000 / this.targetSpeed) < time)
		{
			this.previousTick = time;
			this.computeTick();
		}
		if (this.previousTick < (1000 / this.targetSpeed) - this.timePrecision)
			setTimeout(this.gameLoop);
		else
			setImmediate(this.gameLoop);
	}.bind(that);
	this.gameLoop(0);
}

engine.prototype.computeTick = function() {
	console.log("loop");
};

module.exports = engine;