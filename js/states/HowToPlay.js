/**
Project: SlapEm Happy
File: HowToPlay.js
Date: March 31st, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.HowToPlay = function(game) {};

SlapEmHappy.HowToPlay.prototype = {
  
  init: function(score, level, musicIsPlaying) {
    var playerScore = score || 0;
    this.highestScore = this.highestScore || 0;
    
    this.highestScore = Phaser.Math.max(playerScore, this.highestScore);
    
    this.levelAchieved = level || 0;
    
    this.musicIsPlaying = musicIsPlaying || false;
  }, // end of init function
  
  create: function() {
    var positiveSFX = this.add.audio('positive');
    var negativeSFX = this.add.audio('negative');
    
    var buttonMainMenu = this.add.button(this.game.width / 2, (this.game.height / 2) + 144, 'buttonMainMenu', function() { this.game.state.start('MainMenu', true, false, this.playerScore, this.level, true); }, this, 0, 1, 2);
    buttonMainMenu.anchor.set(0.5); // set the play button anchor in the middle
    buttonMainMenu.setDownSound(negativeSFX);
    
    this.mainMenuButtonGroup = this.add.group();
    
    this.mainMenuButtonGroup.add(buttonMainMenu);
    
    this.drawTarget();
    this.helpText();
    
    var buttonMute = this.add.button(this.world.width, 0, 'buttonMute', function() { if (this.sound.mute) this.sound.mute = false; else this.sound.mute = true; }, this, 0, 1, 2); // create a pause button in the top right corner    
    buttonMute.anchor.set(1.0, 0.0); // set the play button anchor in the middle    
    buttonMute.scale.set(0.5); // scale pause button to 50%    
    buttonMute.setDownSound(negativeSFX);
  }, // end of create function
  
  drawTarget: function() {
    var target = this.add.image(this.world.centerX, this.world.centerY - 100, 'shapeSheet');
    target.anchor.set(0.5);
    target.scale.set(0.75);   
  },
  
  helpText: function() {
    var textA = "To play Slap'Em Happy,\nslap the targets by clicking or tapping them.";
    var textB = "1                   2                   3                   4                   5\nNumber of slaps to make the target happier.";
    
    var style = { font: "bold 32px Arial", fill: "#dddddd", align: "center" }; // format the text
    
    var firstLine = this.add.text(this.world.centerX, this.world.centerY - 240, textA, style); // highest score text below the instruction text
    firstLine.anchor.set(0.5); // set the text anchor to the middle of the text
    
    var secondLine = this.add.text(this.world.centerX, this.world.centerY + 32, textB, style);
    secondLine.anchor.set(0.5);
  }
};
