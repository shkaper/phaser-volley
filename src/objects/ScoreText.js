import Config from '../utils/Config';

class ScoreText extends Phaser.Text {

    constructor(game, side, initialScore) {

        super(game, Config.score.textPosition[side].x, Config.score.textPosition[side].y, initialScore.toString());

        this.setStyle(Config.score.textStyle);

    }

}

export default ScoreText;
