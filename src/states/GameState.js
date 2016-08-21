import MarkerBlink from 'objects/MarkerBlink';
import Ball from 'objects/Ball';
import Player from 'objects/Player';
import Obstacle from 'objects/Obstacle';
import Config from 'utils/Config';

class GameState extends Phaser.State {

    init() {
        this.debugMode = true;
        this.game.clearBeforeRender = false;
        this.game.time.advancedTiming = true;
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
        this.game.center = {x: this.game.world.centerX, y: (this.game.height / 2)};
        let bg = this.game.add.sprite(0, 0, 'beach');

        //physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = Config.physics.gravity.y;
        this.game.physics.p2.friction = Config.physics.friction;
        
        //collision groups
        let playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        let ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
        let obstaclesCollisionGroup = this.game.physics.p2.createCollisionGroup();
        let playerWallCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();

        // material
        let playerMaterial = this.game.physics.p2.createMaterial('playerMaterial');
        let ballMaterial = this.game.physics.p2.createMaterial('ballMaterial');
        let worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
        let groundMaterial = this.game.physics.p2.createMaterial('groundMaterial');
        this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, false, false); //left, right, top, bottom

        let ground = new Obstacle(this.game, this.game.center.x, this.game.height - 50, null, groundMaterial, obstaclesCollisionGroup, [playerCollisionGroup, ballCollisionGroup], this.game.world.width, 20);
        let poleWhole = new Obstacle(this.game, this.game.center.x, this.game.height - 200, 'poleWhole', worldMaterial, obstaclesCollisionGroup, [playerCollisionGroup, ballCollisionGroup]);
        let playerWall = new Obstacle(this.game, this.game.center.x, 0, null, worldMaterial, playerWallCollisionGroup, [playerCollisionGroup], poleWhole.width + 2, this.game.height * 2);

        this.obstacles = this.game.add.group();
        this.obstacles.addMultiple([ground, poleWhole, playerWall]);

        // player
        this.player = new Player(this.game, playerMaterial, playerCollisionGroup, [ballCollisionGroup, obstaclesCollisionGroup, playerWallCollisionGroup], 'left');
        this.game.add.existing(this.player);

        // player 2
        this.player2 = new Player(this.game, playerMaterial, playerCollisionGroup, [ballCollisionGroup, obstaclesCollisionGroup, playerWallCollisionGroup], 'right');
        this.game.add.existing(this.player2);

        // ball
        this.ball = new Ball(this.game, 145, 300, ballMaterial, ballCollisionGroup, [playerCollisionGroup, obstaclesCollisionGroup]);
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
            //this.game.debug.text(`${this.game.center.x} and ${this.game.center.y}`, 20, 50, "yellow", "Segoe UI");
            this.game.debug.pixel(this.game.center.x, this.game.center.y, 'rgb(0,255,0)', 4);
        }
        this.game.debug.text(`FPS: ${this.game.time.fps}`, 700, 20, "yellow", "Segoe UI");
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
