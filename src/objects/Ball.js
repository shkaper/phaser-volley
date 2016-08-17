class Ball extends Phaser.Sprite {

    /**
     * Ball object
     * @param game
     * @param x
     * @param y
     * @param material
     */
    constructor(game, x, y, material) {

        super(game, x, y, 'ball');

        this._radius = 32;
        this._previousX = x;

        this.game = game;
        this.game.physics.p2.enable(this, this.game.debugMode);
        this.body.setCircle(this._radius);
        this.body.mass = 1;
        this.body.setMaterial(material);
        //Ball is not moving when just created
        this.body.data.gravityScale = 0;

    }

    update() {
        //Check if ball went through the net since the previous frame
        if ((this.y > this.game.height - 400) && (this._previousX - this.game.world.centerX) * (this.body.x - this.game.world.centerX) < 0) {
            //Move ball 50px back and reverse velocity
            this.body.x -= Math.sign(this.body.velocity.x) * 50;
            this.body.velocity.x = (-1) * this.body.velocity.x;
        } else {
            this._previousX = this.body.x;
        }
        return super.update();
    }

}

export default Ball;