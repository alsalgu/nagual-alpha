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
  var enemies;

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

    create: function() {
      // Adding Global Parent Groups
      // These will manage functions for overall categories
      // For example, all collectibles will get killed()
      // But each collectible will have specialized functions later.
      var collectibles = game.add.group();
      var platforms = game.add.group();
      var player = game.add.group();
      // Maybe the HUD should be its own prototype???
      var hud = game.add.group();
            // SubGroups will be in their respective level state
      // ex: var iceBlocks = game.add.physicsGroup(Phaser.Physics.P2JS);
      // To add them to the main group: platforms.add(iceBlocks);
    },
    animatePapalotl: function() {
      papalotl.forEach(function(papalotl) {
        papalotl.animations.add('flutter', [23, 24, 25], 10, true);
        papalotl.animations.play('flutter');
      });
    },
    animateCoyotl: function() {
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
