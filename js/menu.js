var menuState = {
  create: function() {
    // Create Game Menu Text. Params: (x, y, 'String', 'font attributes')
    var nameLabel = game.add.text(80, 80, 'Nagual Alpha', {
      font: '50px Arial',
      fill: '#ffffff'
    });

    // Instructions for starting the Game
    var startLabel = game.add.text(80, game.world.height - 80,
      'Press "W" to Start', {
        font: '25px Arial',
        fill: '#ffffff'
      });

    // Defining the W Key for use by Phaser
    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    // When Key is Pressed, Call Start function
    wkey.onDown.addOnce(this.start, this);
  },

  start: function(){
    game.stare.start('play');
  },
};
