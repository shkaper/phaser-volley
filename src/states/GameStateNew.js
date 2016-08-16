class GameState extends Phaser.State {

	init() {
		this.debugMode = true;
	}

	preload(){
		this.game.load.image('beach', 'img/beach.jpg');
		this.game.load.image('player', 'img/0b.png');
		this.game.load.image('ball', 'img/ball.png');
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		let bg =  this.game.add.image(0, 0, 'beach');

		//physics
		this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 750;

		var player = this.game.add.sprite(145, 450, 'player');
		this.game.physics.p2.enable(player, true);
		var ball = this.game.add.sprite(145, 100, 'ball');
		this.game.physics.p2.enable(ball, true);

		var spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial', player.body);
		//var worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
		var ballMaterial = this.game.physics.p2.createMaterial('ballMaterial');
		ball.body.setMaterial(ballMaterial);

		//this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

		var contactMaterial = this.game.physics.p2.createContactMaterial(spriteMaterial, ballMaterial, {
			friction: 0.3,
			restitution: 1.0
		});
		//contactMaterial.friction = 0.3;
		//contactMaterial.restitution = 1.0;



		this.keyDebug = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyDebug.onDown.add(() => {
			this.toggleDebug();
		});
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	update() {
		//console.log(this.player);

		//this.game.physics.arcade.collide(this.ball, this.player);
		//this.game.physics.arcade.collide(this.player, this.obstacles);
		//this.game.physics.arcade.collide(this.ball, this.obstacles);

		//  Reset the players velocity (movement)
		//this.player.body.velocity.x = 0;
        //
        //
		//let cur = this.cursors;
		//if (cur.left.isDown)
		//{
		//	//  Move to the left
		//	this.player.body.velocity.x = -150;
		//	//player.animations.play('left');
		//}
		//else if (cur.right.isDown)
		//{
		//	//  Move to the right
		//	this.player.body.velocity.x = 150;
		//	//player.animations.play('right');
		//}
		//else
		//{
		//	//  Stand still
		//	//player.animations.stop();
		//	this.player.frame = 4;
		//}
        //
		////  Allow the player to jump if they are touching the ground.
		//if (cur.up.isDown && this.touchingDown(this.player))
		//{
		//	this.player.body.velocity.y = -500;
		//}

	}

	render() {
		if (this.debugMode) {
			//this.game.debug.bodyInfo(this.player,20,35);
			//this.game.debug.body(this.player);
			//this.game.debug.body(this.ball);
			////this.game.debug.bodyInfo(this.obstacles.getChildAt(0),20,20);
			////this.game.debug.body(this.obstacles.getChildAt(12));
			//this.obstacles.forEach((s)=>{
			//	this.game.debug.body(s);
			//});
			this.game.debug.text("DEBUG MODE. Press 'A' to disable", 20, 20, "yellow", "Segoe UI");
		}
		//this.player.body.debug = this.debugMode;
		//this.ball.body.debug = this.debugMode;
	}

	toggleDebug() {
		this.debugMode = !this.debugMode;
		if (!this.debugMode) {
			this.game.debug.reset();
		}
		console.info(`Debug mode ${this.debugMode ? "enabled" : "disabled"}`);
	}

    touchingDown(someone) {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;
        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
            if (c.bodyA === someone.body.data || c.bodyB === someone.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === someone.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }
        return result;
    }

}

export default GameState;
