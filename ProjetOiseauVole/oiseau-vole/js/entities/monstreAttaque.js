 define([	'underscore',
			'createjs',
			'radio'],
function(	_,
			createjs,
			radio) {

	'use strict';

	var monstreAttaqueImage = FLAPPYSONIC.loadQueue.getResult('monstreAttaque');

	var dataMonstreAttaque = new createjs.SpriteSheet({
		'images': [monstreAttaqueImage],
		'frames': {
			'width': 150,
			'height': 110,
			'regX': 0,
			'regY': 0,
			'count': 4
		},
		'animations': {
			'attaque': [1, 'jump']
		}
	});

	var MonstreAttaque = function() {
		this.width = this.getBounds().width;
		this.height = this.getBounds().height;
		
		// we don't actually need to position dead sonic, as he will be positioned when
		//	sonic dies and he's rendered to the stage

		this.framerate = 1;

		this.initialize();
	};

	MonstreAttaque.prototype = new createjs.Sprite(dataMonstreAttaque, 'attaque');

	MonstreAttaque.prototype.initialize = function() {
		// subscribe to various pubsub publishers
		//radio('deadSonic:rendered').subscribe([this.plummet, this]);
	};

	MonstreAttaque.prototype.plummet = _.once(function() {
		if (!createjs.Ticker.getPaused()) {
			
			createjs.Tween.get(this, { override: true })
				.to({ y: (this.y - 40) }, 300, createjs.Ease.getPowIn(2.2))
				.wait(300)
				.to({ y: FLAPPYSONIC.canvas.height }, 800, createjs.Ease.cubicInOut)
				.wait(500)
				.call(function() {
					createjs.Sound.play('die', createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.8, 0);

					radio('deadSonic:finished').broadcast();
				});
		}
	});
 
	return MonstreAttaque;

});