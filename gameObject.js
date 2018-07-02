"use strict"

var vec			= require('./vec.js');

var gameObject	= function(engine, config) {
	this.position		= config.position		|| new vec.v2(0, 0);
	this.height			= config.height			|| 50;
	this.width			= config.width 			|| 50;
	this.speed			= config.speed 			|| new vec.v2(0, 0);
	this.acceleration	= config.acceleration	|| new vec.v2(0, 0);
	this.hitboxes		= [];
	this.friction		= config.friction		|| new vec.v2(0.3, 0.3);
	this.id				= this.makeId();
}

gameObject.prototype.makeId			= function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.id = text;
}

gameObject.prototype.computeDeltaV	= function() {
	this.acceleration.sub(this.friction)
	this.speed.add(this.acceleration);
};

gameObject.prototype.computeMoves	= function() {
	this.computeDeltaV();
	this.position.add(this.speed);
}