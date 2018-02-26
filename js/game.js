// The GAME.JS file is simple. Its basic functions
// are to create the Game object and map it gameDiv,
// add the various states to it, and start to boot state.

// Create the Game Object.
// The first values are the game size.
// The second parameter is the ID of the Div Element
// the Game is in.
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Adding each state with a calling and defining name.
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('lose', loseState);
game.state.add('win', winState);

// Once all states have been added, start the game
// By Calling Boot State.
game.state.start('boot');
