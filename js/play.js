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
    ground = map.createLayer('GROUND');
    ice = map.createLayer('ICE');
    water = map.createLayer('WATER');
    waterObject = game.add.physicsGroup();
    spikes = game.add.physicsGroup();
    player = game.add.physicsGroup();
    // Creating Objects from Tiled Objects layers JSON data
    // Param = (Layer Name, Object Name, Tilesheet from Phaser, TIlesheet Frame
    // true, false, group you're adding them into)
    map.createFromObjects('OBJECTS', 'water', 'tiles', 1, true, false, waterObject);
    map.createFromObjects('OBJECTS', 'spikes', 'tiles', 21, true, false, spikes);
    map.createFromObjects('OBJECTS', 'playerSpawn', 'player', 0, true, false, player);
    spikes.forEach(function(spikes){
      spikes.body.immovable = true;
    });
    player.forEach(function(player){
      player.body.bounce.y = 0.2;
      player.body.gravity.y = 700;
      player.body.collideWorldBounds = true;
      player.animations.add('move', [0, 1], 10, true);
      game.camera.follow(player);
    })
    // Set Collision for tiles,
    // 1 and 2 PARAMs are the tile numbers to be checked.
    // Then set collision to true
    // Finally select the Tiled layer to collide with
    map.setCollisionBetween(1, 999, true, 'GROUND');
    map.setCollisionBetween(1, 999, true, 'ICE');

    // Add Keyboard Controls
    cursors = game.input.keyboard.createCursorKeys();

    //Attempting to add Tiled Objects to Phaser Groups
  },

  //FUnction to check the boundaries of two sprites and see if they overlap
  checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },

  update: function() {
    // Enable collision checks between params
    // First Param is a sprite
    // Second param is a layer
    player.forEach(function(player){
      var hitPlat = game.physics.arcade.collide(player, ground);
      var hitIce = game.physics.arcade.collide(player, ice);
      var hitSpikes = game.physics.arcade.collide(player, spikes);

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
      if (cursors.up.isDown /*&& player.body.onFloor()*/ && hitPlat) {
        player.body.velocity.y = -350;
      } else if (cursors.up.isDown /*&& player.body.onFloor()*/ && hitIce) {
        player.body.velocity.y = -350;
      };

      if (hitSpikes){
        console.log('owie')
      };
    })



  }
}
