// The GAME.JS file is simple. Its basic functions
// are to create the Game object and map it gameDiv,
// add the various states to it, and start to boot state.

// Create the Game Object.
// The first values are the game size.
// The second parameter is the ID of the Div Element
// the Game is in.
window.onload = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
  var map;
  var layer;
  var collision;
  var cursors;

  // Adding each state with a calling and defining name.
  game.state.add('boot', bootState);
  game.state.add('load', loadState);
  game.state.add('menu', menuState);
  game.state.add('play', playState);

  //Starting Physics, Uncomment this after play.JS has been re-written
  //game.physics.startSystem(Phaser.Physics.P2JS);

  // Create Global Functions to be Shared Across States/Levels
  // To access them elsewhere write them as: game.prototype.collectPapalotl;

  game.prototype = {
    create : function(){
      // Adding Global Parent Groups
      // These will manage functions for overall categories
      // For example, all collectibles will get killed()
      // But each collectible will have specialized functions later.
      var collectibles = game.add.group();
      var enemies = game.add.group();
      var platforms = game.add.group();
      var player = game.add.group();
      // Maybe the HUD should be its own prototype???
      var hud = game.add.group();
      // SubGroups will be in their respective level state
      // ex: var iceBlocks = game.add.physicsGroup(Phaser.Physics.P2JS);
      // To add them to the main group: platforms.add(iceBlocks);
    },
    ///////////////////////
    // PLAYER FUNCTIONS //
    //////////////////////
    playerFunctions: function(){
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
    },
    animatePapalotl: function() {
      papalotl.forEach(function(papalotl) {
        papalotl.animations.add('flutter', [23, 24, 25], 10, true);
        papalotl.animations.play('flutter');
      });
    },
    collectPapalotl: function(player, papalotl) {
      papalotl.kill();
    },

  }
  // Once all states have been added, start the game
  // By Calling Boot State.
  game.state.start('boot');
}
