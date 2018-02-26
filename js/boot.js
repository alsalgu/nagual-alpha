// Defining the Boot State
var bootState = function(game){
  console.log("Starting!")
};

bootState.prototype = {
  create: function(){
    this.game.state.start("load");
  }
}
