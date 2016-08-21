class Obstacle extends Phaser.Sprite {

    /**
     * Obstacle object
     * @param game
     * @param x
     * @param y
     * @param {Phaser.Physics.P2.Material} material
     * @param {Phaser.Physics.P2.CollisionGroup} collisionGroup
     * @param {Phaser.Physics.P2.CollisionGroup|Array} collidesWith
     * @param sprite
     * @param width
     * @param height
     */
    constructor(game, x, y, sprite, material, collisionGroup, collidesWith, width, height) {

        super(game, 0, 0, sprite);

        this.game = game;
        this.game.physics.p2.enable(this, this.game.debugMode);
        this.body.static = true;
        if (width || height) this.body.setRectangle(width, height); //default is 16
        this.body.x = x;
        this.body.y = y;
        this.body.setMaterial(material);
        this.body.setCollisionGroup(collisionGroup);
        this.body.collides(collidesWith);

    }

}

export default Obstacle;