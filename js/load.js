var loadState = {
  // Phaser Function Preload
  preload: function() {

    // Add a loading label on the screen
    var loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    });

    //Loading all assests
    //Sprites
    game.load.spritesheet('player', 'assets/sprites/spritesheets/', 48, 48);
    //Maps
    // First load the tilemap JSON, and then the corresponding tileset image
    game.load.tilemap('testMap', 'assets/maps/testMap.JSON', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/sprites/tilesheets/testTilesheet.png');
  },

  create: function() {
    // Call the Menu State
    game.state.start('menu');
  }
}
