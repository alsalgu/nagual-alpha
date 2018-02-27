var playState = function(game) {}


playState.prototype = {
  create: function() {
    // Physics enabled overall.
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // Setting key to simple definition
    map = game.add.tilemap('testMap');

    // First Param = Tileset Name from Tiled and JSON
    // Second Param = Maps this name to Phaser.Cache key 'tiles'
    map.addTilesetImage('basic-tiles', 'tiles')

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

    // Player Add animations
    player.animations.add('move', [0, 1], 10, true);

    // Camera follows player.
    game.camera.follow(player);

    // Add Keyboard Controls
    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    // Enable collision checks between params
    // First Param is a sprite
    // Second param is a layer
    var hitPlat = game.physics.arcade.collide(player, collision);

    // Player Controls
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -150;

      player.animations.play('move');
    } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 150;

      player.animations.play('move');
    } else {
      //  Stand still
      player.animations.stop();

      player.frame = 1;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlat)
    {
        player.body.velocity.y = -350;
    }

  }
}
