import Config from '../utils/Config';

class Ball extends Phaser.Sprite {

    /**
     * Ball object
     * @param game
     * @param {String} side
     * @param {Phaser.Physics.P2.Material} material
     * @param {Phaser.Physics.P2.CollisionGroup} collisionGroup
     * @param {Phaser.Physics.P2.CollisionGroup|Array} collidesWith
     */
    constructor(game, side, material, collisionGroup, collidesWith) {

        let x = Config.ball.position[side].x;
        let y = Config.ball.position[side].y;

        super(game, x, y, 'ball');

        this._radius = this.height / 2;

        this.game = game;
        this.game.physics.p2.enable(this, this.game.debugMode);
        this.body.setCircle(this._radius);
        this.body.mass = 1;
        this.body.setMaterial(material);
        this.body.setCollisionGroup(collisionGroup);
        this.body.collides(collidesWith);
        this.initiate(side);
    }

    update() {
        //Check if ball went through the net since the previous frame
        if ((this.y > this.game.height - 370) && (this._previousX - this.game.center.x) * (this.body.x - this.game.center.x) < 0) {
            //Move ball 50px back and reverse velocity
            this.body.x -= Math.sign(this.body.velocity.x) * 50;
            this.body.velocity.x = (-1) * this.body.velocity.x;
        } else {
            this._previousX = this.body.x;
        }
        return super.update();
    }

    ballHit(body) {
        if (body) {
            this.body.data.gravityScale = 1;
        }
    }

    /**
     * Reset the ball and re-station it at the given side
     * @param side
     */
    initiate(side) {
        this.reset(Config.ball.position[side].x, Config.ball.position[side].y);
        //Ball is not moving when just created
        this.body.data.gravityScale = 0;
        //Set gravity to 1 when the ball is hit first time
        this.body.onBeginContact.addOnce(this.ballHit, this);

        this._previousX = this.x;
    }

}

export default Ball;