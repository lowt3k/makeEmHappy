/**
Project: SlapEm Happy
File: MainMenu.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.MainMenu = function(game) {
  this.music = null;
};

SlapEmHappy.MainMenu.prototype = {
  
  init: function(score, level, musicIsPlaying) {
    var playerScore = score || 0;
    this.highestScore = this.highestScore || 0;
    
    this.highestScore = Phaser.Math.max(playerScore, this.highestScore);
    
    this.levelAchieved = level || 0;
    
    this.musicIsPlaying = musicIsPlaying || false;
  }, // end of init function

  create: function() {
    this.music = this.add.audio('music');
    console.log(this.musicIsPlaying);
    if (!this.musicIsPlaying) this.music.play();
    
    var positiveSFX = this.add.audio('positive');
    var negativeSFX = this.add.audio('negative');
    
//    this.state.start('Intermission', true, false, this.playerScore, this.level, this.targetsTotal, this.targetFrameLimit);
    
    var buttonPlay = this.add.button(this.world.centerX, this.world.centerY - 144, 'buttonPlay', function() { this.state.start('GameLoop'); }, this, 0, 1, 2);
    buttonPlay.anchor.set(0.5); // set the play button anchor in the middle
    buttonPlay.setDownSound(positiveSFX);
    
    var buttonHowToPlay = this.add.button(this.world.centerX, this.world.centerY, 'buttonHowToPlay', function() { this.state.start('HowToPlay'); }, this, 0, 1, 2);
    buttonHowToPlay.anchor.set(0.5); // set the play button anchor in the middle
    buttonHowToPlay.setDownSound(positiveSFX);

    var buttonQuit = this.add.button(this.world.centerX, this.world.centerY + 144, 'buttonQuit', function() { window.location.href = "http://www.rucontrolled.com"; }, this, 0, 1, 2);
    buttonQuit.anchor.set(0.5); // set the play button anchor in the middle
    buttonQuit.setDownSound(negativeSFX)
    
    this.mainMenuButtonGroup = this.add.group(); // create a group to hold all the main menu buttons
    
    this.mainMenuButtonGroup.add(buttonPlay, buttonHowToPlay, buttonQuit); // add buttons to the main menu button group  
    
    var text = "Highest Score: " + this.highestScore + " | Level Achieved: " + this.levelAchieved; // high score text
    var style = { font: "bold 32px Arial", fill: "#dddddd", align: "center" }; // format the text
    var h = this.add.text(this.world.centerX, this.world.centerY - 240, text, style); // highest score text below the instruction text
    h.anchor.set(0.5); // set the text anchor to the middle of the text    
  } // end of create function
};