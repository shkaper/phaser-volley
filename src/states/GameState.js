import MarkerBlink from 'objects/MarkerBlink';
import Ball from 'objects/Ball';
import Player from 'objects/Player';
import Config from 'utils/Config';

class GameState extends Phaser.State {

    init() {
        this.debugMode = true;
        this.game.clearBeforeRender = false;
    }

    preload() {
        this.game.load.image('beach', 'img/beach.jpg');
        this.game.load.image('player', 'img/0b.png');
        this.game.load.image('player2', 'img/0r.png');
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
        this.game.physics.p2.gravity.y = Config.physics.gravity.y;
        this.game.physics.p2.friction = Config.physics.friction;

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
        this.player = new Player(this.game, playerMaterial, 'left');
        this.game.add.existing(this.player);

        // player 2
        this.player2 = new Player(this.game, playerMaterial, 'right');
        this.game.add.existing(this.player2);

        // ball
        this.ball = new Ball(this.game, 145, 300, ballMaterial);
        this.game.add.existing(this.ball);

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

    }

    update() {
        return super.update();
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
            //this.game.debug.pixel(this.center.x, this.game.height - 370, 'rgb(0,255,0)', 4);
        }
        this.obstacles.forEach((s)=> {
            s.body.debug = this.debugMode;
        });
        this.player.body.debug = this.debugMode;
        this.player2.body.debug = this.debugMode;
        this.ball.body.debug = this.debugMode;

    }

    toggleDebug() {
        this.debugMode = !this.debugMode;
        if (!this.debugMode) {
            this.game.debug.reset();
        }
        console.info(`Debug mode ${this.debugMode ? "enabled" : "disabled"}`);
    }

}

export default GameState;
