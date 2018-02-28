var loadState = function(game) {}

loadState.prototype = {
  // Phaser Function Preload
  preload: function() {

    // Add a loading label on the screen
    var loadingLabel = this.game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    });

    //Loading all assests
    //Sprites
    this.game.load.spritesheet('player', 'assets/sprites/spritesheets/playerSheet.png', 48, 48);
    //Maps
    // First load the tilemap JSON, and then the corresponding tileset image
    this.game.load.tilemap('testMap', 'assets/maps/testMap.JSON', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/sprites/tilesheets/basic-tiles.png');
    this.game.load.image('test', 'assets/sprites/tilesheets/testTile.png');
  },

  create: function() {
    // Call the Menu State
    this.game.state.start('menu');
  }
};
