var playState = function(game) {}


playState.prototype = {
  create: function() {
    // Physics enabled overall.
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // Setting key to simple definition
    map = game.add.tilemap('testMap');

    // First Param = Tileset Name from Tiled and JSON
    // Second Param = Maps this name to Phaser.Cache key 'tiles'
    map.addTilesetImage('testTilesheet', 'tiles')

    // Create layer from the layer in map data
    // Only first layer needs to be a defined variable
    layer = map.createLayer('BG1');

    // Resize the game world to fit the map size
    layer.resizeWorld();

    // Create map layers from Tiled Editor layers
    collision = map.createLayer('PLATFORMS');

    // Set Collision for tiles,
    // 1 and 2 PARAMs are the tile numbers to be checked.
    // Then set collision to true
    // Finally select the Tiled layer to collide with
    map.setCollisionBetween(1, 999, true, 'PLATFORMS')

    // Add Player Sprite
    player = game.add.sprite(48, 48, 'player');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 700;
    player.body.collideWorldBounds = true;
    // Camera follows player.
    game.camera.follow(player)
  },

  update: function() {
    // Enable collision checks between params
    // First Param is a sprite
    // Second param is a layer
    game.physics.arcade.collide(player, collision);

    // Player Controls

  }
}
