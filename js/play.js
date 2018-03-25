var playState = function(game) {}

playState.prototype = {
  create: function() {
    // Start Physics Engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create Map from JSON
    map = game.add.tilemap('testMap');

    // Define the sources use for the tilemap
    // First Param: The name of the tilesheet used in Tiled
    // Second Param: The name of the same tilesheet but as saved in Phaser.
    map.addTilesetImage('basic-tiles', 'tiles');

    // Create the Layers in Phaser from the layer names
    // from the Tiled JSON Data.
    layer = map.createLayer('GROUND');
    water = map.createLayer('WATER');
    ice = map.createLayer('ICE');

    // Resize Game World to Match Imported Layers
    layer.resizeWorld();

    // Add Groups to Categorize Game Objects
    // Player Group
    player = game.add.physicsGroup();
    // Collectible Group
    papalotl = game.add.physicsGroup();
    // Platform Group
    spikes = game.add.physicsGroup();
    walls = game.add.physicsGroup();
    // Enemy Groups
    coyotl = game.add.physicsGroup();
    slug = game.add.physicsGroup();
;
    // Import Objects from Tiled JSON into Game World
    // Params = (Layer Name, Object Name, Tilesheet from Phaser, TIlesheet Frame
    // true, false, group you're adding them into)
    map.createFromObjects('OBJECTS', 'upSpikes', 'tiles', 21, true, false, spikes);
    map.createFromObjects('OBJECTS', 'leftSpikes', 'tiles', 31, true, false, spikes);
    map.createFromObjects('OBJECTS', 'player', 'player', 0, true, false, player);
    map.createFromObjects('OBJECTS', 'coyotl', 'tiles', 13, true, false, coyotl);
    map.createFromObjects('OBJECTS', 'slug', 'tiles', 6, true, false, slug);
    map.createFromObjects('OBJECTS', 'papalotl', 'tiles', 23, true, false, papalotl);
    map.createFromObjects('OBJECTS', 'wall', 'tiles', 0, true, false, walls);

    // Create and Animate each of the placed objects
    game.prototype.animatePapalotl();
    game.prototype.animateCoyotl();
    game.prototype.animatePlayer();
    game.prototype.animateSlug();

    player.forEach(function(player){
      game.camera.follow(player);
    });

    spikes.forEach(function(spikes){
      spikes.body.immovable = true;
    });

    walls.forEach(function(walls){
      walls.body.immovable = true;
    });

    map.setCollisionBetween(1, 999, true, 'GROUND');
    map.setCollisionBetween(1, 999, true, 'ICE');

    cursors = game.input.keyboard.createCursorKeys();

  },

  update: function() {
    player.forEach(function(player) {
      var hitPlat = game.physics.arcade.collide(player, layer);
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
      game.physics.arcade.collide(coyotl, layer);
      game.physics.arcade.collide(coyotl, ice);
      var hitWall = game.physics.arcade.collide(coyotl, walls);
      var hitGround = game.physics.arcade.collide(coyotl, layer);


      if (hitWall && coyotl.body.touching.right || coyotl.body.blocked.right) {
        coyotl.body.velocity.x = -100;
        coyotl.scale.x *= -1;
      } else if (hitWall && coyotl.body.touching.left || coyotl.body.blocked.left) {
        coyotl.body.velocity.x = 100;
        coyotl.scale.x *= -1;
      };

    });

    slug.forEach(function(slug){
      game.physics.arcade.collide(slug, layer);
      game.physics.arcade.collide(slug, ice);
      var hitWall = game.physics.arcade.collide(slug, walls);

      if (hitWall && slug.body.touching.right || slug.body.blocked.right) {
        slug.body.velocity.x = -100;
        slug.scale.x *= -1;
      } else if (hitWall && slug.body.touching.left || slug.body.blocked.left) {
        slug.body.velocity.x = 100;
        slug.scale.x *= -1;
      };
    });
  }
}
