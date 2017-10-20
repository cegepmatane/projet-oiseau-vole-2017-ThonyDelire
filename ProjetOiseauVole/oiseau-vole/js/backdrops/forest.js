define([	'createjs'],
function(	createjs) {

	'use strict';

	var bitmap = new createjs.Bitmap(FLAPPYSONIC.loadQueue.getResult('floor'));
	var scale = 96/bitmap.getBounds().height;
	
	var Forest = function() {
		this.matrix2d = new createjs.Matrix2D();
		this.matrix2d.scale(scale, scale);
		this.image = FLAPPYSONIC.loadQueue.getResult('floor');
		this.x=0;
		this.y = (FLAPPYSONIC.canvas.height - 96);
	};

	Forest.prototype = new createjs.Shape();
	

	Forest.prototype.scroll = function (speed) {
		this.matrix2d.translate(-speed, 0);
		this.graphics.clear().beginBitmapFill(this.image, "repeat", this.matrix2d).rect(0, 0, FLAPPYSONIC.canvas.width, 96);
	}	
	
	return Forest;

});