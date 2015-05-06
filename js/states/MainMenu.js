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
    this.music = this.game.add.audio('music', 0.5, true);
    console.log(this.musicIsPlaying);
    if (!this.musicIsPlaying) this.music.play();
    
    var positiveSFX = this.game.add.audio('positive');
    var negativeSFX = this.game.add.audio('negative');
    
    var buttonPlay = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 144, 'buttonPlay', function() { this.state.start('GameLoop'); }, this, 0, 1, 2);
    buttonPlay.anchor.set(0.5); // set the play button anchor in the middle
    buttonPlay.setDownSound(positiveSFX);
    
    var buttonHowToPlay = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'buttonHowToPlay', function() { console.log('how to play called...'); this.state.start('HowToPlay'); }, this, 0, 1, 2);
    buttonHowToPlay.anchor.set(0.5); // set the play button anchor in the middle
    buttonHowToPlay.setDownSound(positiveSFX);

    var buttonQuit = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 144, 'buttonQuit', function() { window.location.href = "http://www.rucontrolled.com"; }, this, 0, 1, 2);
    buttonQuit.anchor.set(0.5); // set the play button anchor in the middle
    buttonQuit.setDownSound(negativeSFX)
    
    var buttonCredits = this.game.add.button(this.world.width, 0, 'buttonCredits', function() { this.state.start('Credits'); }, this, 0, 1, 2);
    buttonCredits.anchor.set(1.0, 0.0); // set the play button anchor in the middle    
    buttonCredits.scale.set(0.5); // scale pause button to 50%    
    buttonCredits.setDownSound(negativeSFX);
    
    this.mainMenuButtonGroup = this.game.add.group(); // create a group to hold all the main menu buttons
    
    this.mainMenuButtonGroup.add(buttonPlay, buttonHowToPlay, buttonQuit, buttonCredits); // add buttons to the main menu button group  
    
    var text = "Highest Score: " + this.highestScore + " | Level Achieved: " + this.levelAchieved; // high score text
    var style = { font: "bold 32px Arial", fill: "#dddddd", align: "center" }; // format the text
    var h = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 240, text, style); // highest score text below the instruction text
    h.anchor.setTo(0.5); // set the text anchor to the middle of the text
  } // end of create function  
};