const Config = {
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
    }
};

export default Config;