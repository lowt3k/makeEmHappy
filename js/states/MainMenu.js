/**
Project: SlapEm Happy
File: MainMenu.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.MainMenu = function() {};

SlapEmHappy.MainMenu.prototype = {
  /**
  preload: function() {
  }, // end of preload function
  **/
  create: function() {
    this.game.stage.backgroundColor = '#ffffff'; // set the colour of the game background to white
    
    var text = "Click to Begin"; // instruction text for the player on how to start the game
    var style = { font: "36px Arial", fill: "#000000", align: "center" }; // format of the text
    var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style); // display start game text in the middle of the game screen
    t.anchor.set(0.5); // set the text anchor to the middle of the text
    
    text = "Highest Score: " + this.highestScore; // high score text
    style = { font: "24px Arial", fill: "#000000", align: "center" }; // format the text
    var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 64, text, style); // highest score text below the instruction text
    h.anchor.set(0.5); // set the text anchor to the middle of the text
    
  }, // end of create function
  
  update: function() {
    if (this.game.input.activePointer.justPressed()) { // check if there has been input and if so do the following...
      this.game.state.start('GameLoop'); // if input start the game loop state
    }
  }, // end of update function
  /**
  render: function() {
  }, // end of render function  
  **/
};