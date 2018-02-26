var playState = function(game) {}


playState.prototype = {
  create: function() {
    // Physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // Binding keyboard for player controls
    cursors = game.input.keyboard.createCursorKeys();

    // Creating the player sprite and enabling Physics
    this.player = game.add.sprite(48, 480, 'player');
    game.physics.arcade.enable(this.player);

    // Setting key to simple definition
    map = game.add.tilemap('testMap');

    // First Param = Tileset Name from Tiled and JSON
    // Second Param = Maps this name to Phaser.Cache key 'tiles'
    map.addTilesetImage('testTilesheet', 'tiles')

    // Create layer from the layer in map data
    layer = map.createLayer('BG1');
    layer.resizeWorld();
    map.createLayer('PLATFORMS')
  },

  update: function() {
    if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.camera.y += 10;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.camera.y -= 10;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.camera.x -= 10;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.camera.x += 10;
    }
}
}
