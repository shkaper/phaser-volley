const Config = {
    game: {
        width: 800,
        height: 600
    },
    physics: {
        gravity: {
            y: 800
        },
        friction: 0.3
    },
    player: {
        right: {
            x: 700,
            y: 450,
            sprite: 'player2',
            polygon: '0b',
            keys: {
                'up': Phaser.KeyCode.UP,
                'down': Phaser.KeyCode.DOWN,
                'left': Phaser.KeyCode.LEFT,
                'right': Phaser.KeyCode.RIGHT
            }
        },
        left: {
            x: 85,
            y: 450,
            sprite: 'player',
            polygon: '0b',
            keys: {
                'up': Phaser.KeyCode.W,
                'down': Phaser.KeyCode.S,
                'left': Phaser.KeyCode.A,
                'right': Phaser.KeyCode.D
            }
        }
    },
    score: {
        textPosition: {
            left: {
                x: 20,
                y: 100
            },
            right: {
                x: 700,
                y: 100
            }
        },
        textStyle: {
            fill: 'red'
        }
    }
};

Config.ball = {
    position: {
        left: {
            x: Config.game.width / 4,
            y: Config.game.height / 2
        },
        right: {
            x: Config.game.width / 4 * 3,
            y: Config.game.height / 2
        }
    }
};

export default Config;