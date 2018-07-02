"use strict"

var socketHandler					= function(engine, config) {
	if (typeof config === 'undefined')
		config = {};
	this.parent					= engine;
	this.port					= 0;
	this.portSearchStartRange	= config.portSearchStartRange	|| 25565;
	this.portSearchEndRange		= config.portSearchEndRange		|| 65536;
	this.io						= require('socket.io')();
	this.findPort();
}

socketHandler.prototype.findPort	= function() {
	var start	= this.portSearchStartRange;
	var that	= this;

	while (start < this.portSearchEndRange)
	{
		this.testPort(start, (port) => {
			if (that.port)
				return ;
			that.port = port;
			that.initSocket();
			that.parent.displayIntro();
			that.parent.gameLoop(0);
		});
		if (!this.port)
			start++;
		else
			break;
	}
}

socketHandler.prototype.initSocket	= function() {
	this.io.on('connection', function(client) {
		client.on('disconnect', function(){

		});
	});
	this.io.listen(this.port);
}

socketHandler.prototype.testPort	= function(port, cb) {
	var net = require('net');
	var server = net.createServer();

	server.on('error', function(err) {
		if (err.code === 'EADDRINUSE') {
		}
		console.log(err.code);
	});
	server.on('listening', function() {
		server.close();
		cb(port);
	});
	server.listen({port : port, host : 'localhost'});
}

module.exports = socketHandler;