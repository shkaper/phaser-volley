import ScoreText from './ScoreText';

class ScoreManager {

    constructor(game) {

        this.game = game;
        this.score = {
            left: 0,
            right: 0
        };

        this.leftScoreText = new ScoreText(this.game, 'left', this.score.left);
        this.rightScoreText = new ScoreText(this.game, 'right', this.score.right);
        this.game.add.existing(this.leftScoreText);
        this.game.add.existing(this.rightScoreText);

    }

    addPoint(side) {
        this.score[side] += 1;
        this.leftScoreText.setText(this.score.left.toString());
        this.rightScoreText.setText(this.score.right.toString());
    }

}

export default ScoreManager;
