// The GAME.JS file is simple. Its basic functions
// are to create the Game object and map it gameDiv,
// add the various states to it, and start to boot state.

// Create the Game Object.
// The first values are the game size.
// The second parameter is the ID of the Div Element
// the Game is in.
window.onload = function(){
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

// Adding Global Parent Groups
// These will manage functions for overall categories
// For example, all collectibles will get killed()
// But each collectible will have specialized functions later.
collectibles = game.add.group();
enemies = game.add.group();
platforms = game.add.group();
player = game.add.group();
// Maybe the HUD should be its own prototype???
hud = game.add.group();
// SubGroups will be in their respective level state
// ex: var iceBlocks = game.add.physicsGroup(Phaser.Physics.P2JS);
// To add them to the main group: platforms.add(iceBlocks);



// Create Global Functions to be Shared Across States/Levels
// To access them elsewhere write them as: game.prototype.collectPapalotl;

game.prototype = {
  collectPapalotl : function(player, papalotl){
    papalotl.kill();
  },
}
// Once all states have been added, start the game
// By Calling Boot State.
game.state.start('boot');}
