class MarkerBlink extends Phaser.Graphics {

    /**
     * A blinking marker.
     * @param game
     * @param tracking - object that should be tracked by the marker
     */
    constructor(game, tracking) {

        super(game, 0, 0);

        this.game = game;
        this.tracking = tracking;
        this.speed = 750; //ms
        this.colorIndex = 0;
        this.colorArray = [0xFFFFFF, 0x000000];
        this.currentColor = this.colorArray[this.colorIndex];
        this._y = 0;
        this._width = 4;
        this._height = 4;

        this.lineStyle(2, this.currentColor, 1);
        this.beginFill(this.currentColor);
        this.drawRect(this.tracking.x, this._y, this._width, this._height);
        this.endFill();

        this.cycleColor();
        this.startTimer();

    }

    update() {
        this.clear();
        this.lineStyle(2, this.currentColor, 1);
        this.beginFill(this.currentColor);
        this.drawRect(this.tracking.x, this._y, this._width, this._height);
        this.endFill();
    }

    /**
     *
     */
    startTimer() {
        this.game.time.events.loop(this.speed, this.cycleColor, this);
    }

    cycleColor() {
        if (this.colorIndex === this.colorArray.length) {
            this.colorIndex = 0;
        }
        this.currentColor = this.colorArray[this.colorIndex];
        this.colorIndex++;
    }

}

export default MarkerBlink;