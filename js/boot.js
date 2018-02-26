// Defining the Boot State
var bootState = {
  // creating 'Create' Phaser function
  create: function() {
    // Starting Physics SYstem
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Calling the Load State
    game.state.start('load');
  }
}
