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
  init: function(score, level) {
    var score = score || 0;
    this.highestScore = this.highestScore || 0;
    
    this.highestScore = Phaser.Math.max(score, this.highestScore);
    
    this.levelAchieved = level || 0;
  },
  
  /**
  preload: function() {
  }, // end of preload function
  **/
  create: function() {    
    var buttonPlay = this.game.make.button(this.game.width / 2, (this.game.height / 2) - 144, 'buttonPlay', function() { this.game.state.start('GameLoop'); }, this, 0, 1, 2);
    buttonPlay.anchor.set(0.5); // set the play button anchor in the middle    
    
    var buttonHowToPlay = this.game.make.button(this.game.width / 2, this.game.height / 2, 'buttonHowToPlay', function() { this.game.state.start('Intermission'); }, this, 0, 1, 2);
    buttonHowToPlay.anchor.set(0.5); // set the play button anchor in the middle    

    var buttonQuit = this.game.make.button(this.game.width / 2, (this.game.height / 2) + 144, 'buttonQuit', function() { window.location.href = "http://www.google.com"; }, this, 0, 1, 2);
    buttonQuit.anchor.set(0.5); // set the play button anchor in the middle    
    
    //this.game.stage.backgroundColor = '#336699'; // set the colour of the game background to...
    
    this.mainMenuButtonGroup = this.game.add.group(); // create a group to hold all the main menu buttons
    
    this.mainMenuButtonGroup.add(buttonPlay); // add play button to the main menu button group    
    this.mainMenuButtonGroup.add(buttonHowToPlay); // add play button to the main menu button group    
    this.mainMenuButtonGroup.add(buttonQuit); // add play button to the main menu button group    
    
    var text = "Highest Score: " + this.highestScore + " | Level Achieved: " + this.levelAchieved; // high score text
    var style = { font: "24px Arial", fill: "#000000", align: "center" }; // format the text
    var h = this.game.add.text(this.game.width / 2, this.game.height / 2 - 240, text, style); // highest score text below the instruction text
    h.anchor.set(0.5); // set the text anchor to the middle of the text    
  }, // end of create function
  
  update: function() {
  }, // end of update function
  /**
  render: function() {
  }, // end of render function  
  **/  
  // --== My Functions ==-- //

  // --== End of My Functions ==--//
};