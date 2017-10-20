define([	'createjs'],
function(	createjs) {

	'use strict';

	var bitmap = new createjs.Bitmap(FLAPPYSONIC.loadQueue.getResult('clouds'));
	var scale = FLAPPYSONIC.canvas.height/bitmap.getBounds().height;
	
	var CloudySky = function() {
		this.matrix2d = new createjs.Matrix2D();
		this.matrix2d.scale(scale, scale);
		this.image = FLAPPYSONIC.loadQueue.getResult('clouds');
		this.x=0;
		this.y=0;
	};

	CloudySky.prototype = new createjs.Shape();
	

	CloudySky.prototype.scroll = function (speed) {
		this.matrix2d.translate(-speed, 0);
		this.graphics.clear().beginBitmapFill(this.image, "repeat", this.matrix2d).rect(0, 0, FLAPPYSONIC.canvas.width, FLAPPYSONIC.canvas.height);
	}	
	
	return CloudySky;

});