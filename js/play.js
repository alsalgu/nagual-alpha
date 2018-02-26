var playState = function(game) {}


playState.prototype = {
  create: function() {
    // Binding keyboard for player controls
    this.keyboard = game.input.keyboard;

    // Creating the player sprite and enabling Physics
    this.player = game.add.sprite(48, 480, 'player');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
  }
}
