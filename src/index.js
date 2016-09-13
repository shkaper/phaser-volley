import GameState from 'states/GameState';
import Config from 'utils/Config';

class Game extends Phaser.Game {

	constructor() {
		super(Config.game.width, Config.game.height, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

new Game();
