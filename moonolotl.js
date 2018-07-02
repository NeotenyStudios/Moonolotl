"use strict";

var		vec				= require('./vec.js');
var		gameObject		= require('./gameObject.js');
var		socketHandler	= require('./socketHandler.js')

var engine = function(config) {
	var that;
	config = config || {};

	this.version			= 0.1;
	this.objects			= [];
	this.width				= config.width			|| 1024;
	this.height				= config.height			|| 720;
	this.targetSpeed		= config.targetSpeed	|| 220;
	this.timePrecision		= 16;
	this.previousTick		= 0;
	this.nbObjects			= 0;
	this.layers				= {};
	this.socketHandler		= new socketHandler(this);
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
}

engine.prototype.computeTick			= function() {
	this.computeObjectsMoves();
};

engine.prototype.computeObjectsMoves	= function() {
	for (var index = this.objects.length; index--;)
		this.objects[index].computeMoves();
}

engine.createGameObject					= function(config) {
	var ret = new gameObject(config);

	this.gameObject.push(ret)
	return (ret);
}

engine.prototype.displayIntro			= function() {
	console.log("  /\\/\\   ___   ___  _ __   ___ | | ___ | |_| |");
	console.log(" /    \\ / _ \\ / _ \\| '_ \\ / _ \\| |/ _ \\| __| |");
	console.log("/ /\\/\\ \\ (_) | (_) | | | | (_) | | (_) | |_| |");
	console.log("\\/    \\/\\___/ \\___/|_| |_|\\___/|_|\\___/ \\__|_|" + " v." + this.version);
	console.log("Running on port " + this.socketHandler.port);
};

module.exports = engine;