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
    layer = map.createLayer('COL');

    // Resize the game world to fit the map size
    layer.resizeWorld();

    // Create map layers from Tiled Editor layers
    ground = map.createLayer('GROUND');
    ice = map.createLayer('ICE');
    water = map.createLayer('WATER');
    waterObject = game.add.physicsGroup();
    spikes = game.add.physicsGroup();
    player = game.add.physicsGroup();
    coyotl = game.add.physicsGroup();
    papalotl = game.add.physicsGroup();
    collision = game.add.physicsGroup();
    // Creating Objects from Tiled Objects layers JSON data
    // Param = (Layer Name, Object Name, Tilesheet from Phaser, TIlesheet Frame
    // true, false, group you're adding them into)
    map.createFromObjects('OBJECTS', 'water', 'tiles', 1, true, false, waterObject);
    map.createFromObjects('OBJECTS', 'spikes', 'tiles', 21, true, false, spikes);
    map.createFromObjects('OBJECTS', 'playerSpawn', 'player', 0, true, false, player);
    map.createFromObjects('OBJECTS', 'coyotl', 'tiles', 13, true, false, coyotl);
    map.createFromObjects('OBJECTS', 'papalotl', 'tiles', 23, true, false, papalotl);
    spikes.forEach(function(spikes) {
      spikes.body.immovable = true;
    });
    papalotl.forEach(function(papalotl) {
      papalotl.animations.add('flutter', [23, 24, 25], 10, true);
      papalotl.animations.play('flutter');
    });
    player.forEach(function(player) {
      player.body.bounce.y = 0.2;
      player.body.gravity.y = 700;
      player.body.collideWorldBounds = true;
      player.animations.add('move', [0, 1], 10, true);
      game.camera.follow(player);
    });
    coyotl.forEach(function(coyotl) {
      coyotl.body.gravity.y = 700;
      coyotl.animations.add('move', [13, 14, 15], 10, true);
      coyotl.animations.play('move');
      coyotl.anchor.setTo(.5, .5);
      game.physics.enable(coyotl);
      coyotl.body.velocity.x = -100;
    })
    // Set Collision for tiles,
    // 1 and 2 PARAMs are the tile numbers to be checked.
    // Then set collision to true
    // Finally select the Tiled layer to collide with
    map.setCollisionBetween(1, 999, true, 'GROUND');
    map.setCollisionBetween(1, 999, true, 'ICE');
    map.setCollisionBetween(1, 999, true, 'COL');

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

  collectPapalotl: function(player, papalotl) {
    papalotl.kill();
  },

  update: function() {
    // Enable collision checks between params
    // First Param is a sprite
    // Second param is a layer
    player.forEach(function(player) {
      var hitPlat = game.physics.arcade.collide(player, ground);
      var hitIce = game.physics.arcade.collide(player, ice);
      var hitSpikes = game.physics.arcade.collide(player, spikes);
      var hitPapalotl = game.physics.arcade.overlap(player, papalotl, game.prototype.collectPapalotl)
      var hitCoyotl = game.physics.arcade.collide(player, coyotl);

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

      if (hitSpikes || hitCoyotl) {
        console.log('owie')
      };
    });

    coyotl.forEach(function(coyotl) {
      game.physics.arcade.collide(coyotl, ground);
      game.physics.arcade.collide(coyotl, ice);
      var hitWall = game.physics.arcade.collide(coyotl, layer);


      if (hitWall && coyotl.body.touching.right || coyotl.body.blocked.right) {
        coyotl.body.velocity.x = -100;
        coyotl.scale.x *= -1;
      } else if (hitWall && coyotl.body.touching.left || coyotl.body.blocked.left) {
        coyotl.body.velocity.x = 100;
        coyotl.scale.x *= -1;
      };

    });

  }
}
