import MarkerBlink from 'objects/MarkerBlink';

class GameState extends Phaser.State {

    init() {
        this.debugMode = true;
    }

    preload() {
        this.game.load.image('beach', 'img/beach.jpg');
        this.game.load.image('player', 'img/0b.png');
        this.game.load.image('poleWhole', 'img/pole_whole.png');
        this.game.load.image('ball', 'img/ball.png');
        this.game.load.physics('playerData', 'assets/player.json');
    }

    create() {
        this.game.world.setBounds(0, -600, 800, 1200);
        this.center = {x: this.game.world.centerX, y: (this.game.height / 2)};
        let bg = this.game.add.sprite(0, 0, 'beach');

        //physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 750;
        this.game.physics.p2.friction = 0.3;

        // material
        var playerMaterial = this.game.physics.p2.createMaterial('playerMaterial');
        var ballMaterial = this.game.physics.p2.createMaterial('ballMaterial');
        var worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
        var groundMaterial = this.game.physics.p2.createMaterial('groundMaterial');
        this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, false, false);

        let ground = this.game.add.sprite(0, this.game.height - 50);
        ground.scale.x = this.game.world.width;
        let poleWhole = this.game.add.sprite(this.center.x, this.game.height - 200, 'poleWhole');

        this.obstacles = this.game.add.group();
        this.obstacles.addMultiple([ground, poleWhole]);
        this.obstacles.forEach((sprite)=> {
            this.game.physics.p2.enable(sprite);
            sprite.body.static = true;
        });

        poleWhole.body.setMaterial(worldMaterial);
        ground.body.setMaterial(groundMaterial);


        // player
        this.player = this.game.add.sprite(85, 450, 'player');
        this.game.physics.p2.enable(this.player, this.debugMode);
        this.player.body.clearShapes();
        this.player.body.loadPolygon('playerData', '0b');
        this.player.body.fixedRotation = true;
        this.player.body.mass = 6;
        this.player.body.setMaterial(playerMaterial);

        // ball
        this.ball = this.game.add.sprite(145, 300, 'ball');
        this.game.physics.p2.enable(this.ball, this.debugMode);
        this.ball.body.setCircle(32);
        this.ball.body.mass = 1;
        this.ball.body.setMaterial(ballMaterial);
        this.ball.body.data.gravityScale = 0;

        this.ball.body.onBeginContact.addOnce(this.ballHit, this);


        let contactPlayerBall = this.game.physics.p2.createContactMaterial(playerMaterial, ballMaterial, {
            restitution: 0.8,
            stiffness: Number.MAX_VALUE,
            friction: 0.2
        });
        let contactPlayerWorld = this.game.physics.p2.createContactMaterial(playerMaterial, worldMaterial, {
            friction: 0
        });
        let contactPlayerGround = this.game.physics.p2.createContactMaterial(playerMaterial, groundMaterial, {
            friction: 0
        });
        let contactBallWorld = this.game.physics.p2.createContactMaterial(ballMaterial, worldMaterial, {
            restitution: 0.7,
            stiffness: Number.MAX_VALUE,
            friction: 0
        });
        let contactBallGround = this.game.physics.p2.createContactMaterial(ballMaterial, groundMaterial, {
            restitution: 0.4,
            stiffness: Number.MAX_VALUE,
            friction: 0.3
        });

        var marker = new MarkerBlink(this.game, this.ball);
        this.game.add.existing(marker);

        this.keyDebug = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.keyDebug.onDown.add(() => {
            this.toggleDebug();
        });

        this.cursors = this.game.input.keyboard.createCursorKeys();

    }

    update() {
        //console.log(this.player);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;


        let cur = this.cursors;
        if (cur.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -200;
            //player.animations.play('left');
        }
        else if (cur.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 200;
            //player.animations.play('right');
        }
        else {
            //  Stand still
            //player.animations.stop();
            //this.player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cur.up.isDown && this.touchingDown(this.player)) {
            this.player.body.velocity.y = -700;
        }

    }

    render() {
        if (this.debugMode) {
            this.game.debug.bodyInfo(this.player, 20, 35);
            //this.game.debug.body(this.player);
            //this.game.debug.body(this.ball);
            ////this.game.debug.bodyInfo(this.obstacles.getChildAt(0),20,20);
            ////this.game.debug.body(this.obstacles.getChildAt(12));
            this.game.debug.text("DEBUG MODE. Press 'X' to disable", 20, 20, "yellow", "Segoe UI");
            //this.game.debug.text(`${this.center.x} and ${this.center.y}`, 20, 50, "yellow", "Segoe UI");
            this.game.debug.pixel(this.center.x, this.center.y, 'rgb(0,255,0)', 4);
        }
        this.obstacles.forEach((s)=> {
            s.body.debug = this.debugMode;
        });
        this.player.body.debug = this.debugMode;
        this.ball.body.debug = this.debugMode;

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

    ballHit(body) {
        if (body) {
            this.ball.body.data.gravityScale = 1;
        }
    }

}

export default GameState;
