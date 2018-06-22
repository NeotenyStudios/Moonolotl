"use strict"

var vec			= require('./vec.js');

var gameObject	= function(engine, config) {
	this.position		= config.position		|| new vec.v2(0, 0);
	this.height			= config.height			|| 50;
	this.width			= config.width 			|| 50;
	this.speed			= config.speed 			|| new vec.v2(0, 0);
	this.acceleration	= config.acceleration	|| new vec.v2(0, 0);
	this.hitboxes		= [];
	this.friction		= config.friction		|| new vec.v2(1, 1);
}

gameObject.prototype.computeDeltaV = function() {
	this.speed.add(this.acceleration);
};