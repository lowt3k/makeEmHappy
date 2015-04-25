/**
Project: SlapEm Happy
File: Intermission.js
Date: March 30, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.Intermission = function(game) {};

SlapEmHappy.Intermission.prototype = {
  
  init: function(score, level, targetTotal, targetFrameLimit) {
    this.playerScore = score;    
    
    this.level = level;
    
    this.targetsTotal = targetTotal;
    
    this.targetFrameLimit = targetFrameLimit;
  }, // end of init function
  
  create: function() {
    var negativeSFX = this.add.audio('negative');
    
    this.coolDownTimer = 0; // timer for cool down period between each gameplay level
    this.coolDownDuration = 4; // the lenght of the cool down period
    this.coolDownStartTime = this.time.totalElapsedSeconds(); // when the cool down period started
    
    var hudTextStyle = { font: "bold 144px Arial", fill: "#dddddd", align: "center" }; // hud text style
        
    //var nextlevel = this.level + 1;
    
    var nextLevelText = this.add.text(this.world.centerX, this.world.centerY - 128, "Level " + this.level + " starts in.." , { font: "bold 48px Arial", fill: "#dddddd", align: "center" });
    nextLevelText.anchor.set(0.5); // centre anchor
    
    var playersScoreText = this.add.text(this.world.centerX, this.world.centerY - 192, "Total Score: " + this.playerScore, { font: "bold 48px Arial", fill: "#33cc33", align: "center" });
    playersScoreText.anchor.set(0.5); // centre anchor
    
    this.coolDownTimerText = this.add.text(this.world.centerX, this.world.centerY, "0", hudTextStyle); // cool down hud text
    this.coolDownTimerText.anchor.set(0.5); // centre anchor
            
//    var buttonMainMenu = this.add.button(this.world.centerX, this.world.centerY + 144, 'buttonMainMenu', function() { this.state.start('MainMenu', true, false, this.playerScore, this.level, true); }, this, 0, 1, 2);
//    buttonMainMenu.anchor.set(0.5); // set the play button anchor in the middle
//    buttonMainMenu.setDownSound(negativeSFX);
//    
//    var ButtonGroup = this.add.group();
//    ButtonGroup.add(buttonMainMenu);

  }, // end of create function

  update: function() {
    this.coolDownTimer = this.coolDownDuration - (this.time.totalElapsedSeconds() - this.coolDownStartTime); // level timer    
    
    if (this.coolDownTimer <= 4 && this.coolDownTimer >= 2) { // change the cool down text based on count
      this.coolDownTimerText.text = this.coolDownTimer.toFixed(0) - 1; // use numbers
    } else if (this.coolDownTimer <= 1) { // less then 2 use "GO"
      this.coolDownTimerText.text = "GO"; //  use "GO"
    }
      
    if (this.coolDownTimer <= 0) { // when the cool down timer reaches 0, load state
      this.state.start('GameLoop', true, false, this.playerScore, this.level, this.targetsTotal, this.targetFrameLimit); // load game play state and pass in the values
    }
  }, // end of update function

  render: function() {
//    this.debugInfo(); // call the debug info function
  }, // end of render function
  
  // --== My Functions ==-- //
  debugInfo: function() {
    // --== Debug Info ==-- //
    this.debug.text('Player\'s Score: ' + this.playerScore, 16, 16); // display player's score
    this.debug.text('Level: ' + this.level, 16, 32); // display current level achieved
    this.debug.text('Time: ' + this.time.totalElapsedSeconds().toFixed(3), 16, 48); // display time
    this.debug.text('Cool Down Timer: ' + this.coolDownTimer.toFixed(3), 16, 64); // display level time
    this.debug.text('Targets Total: ' + this.targetsTotal, 16, 80); // empty debug text line
    this.debug.text('-', 16, 96); // empty debug text line    
    this.debug.text('-', 16, 112); // display name of the target hit
    this.debug.text('Target Frame Limit: '  + this.targetFrameLimit, 16, 128); // display the current frame of the target hit
    this.debug.text('-', 16, 144); // display how many hits on the target hit
    this.debug.text('-', 16, 160); // empty debug text line
    this.debug.text('-', 16, 176); // empty debug text line
    this.debug.text('-', 16, 192); // empty debug text line
    this.debug.text('-', 16, 208); // display total number of targets    
    this.debug.text('-', 16, 224); // display the array of hits on all the targets
    // --== End of Debug Info ==-- //
  }, // end of debugInfo function
  // --== End of My Functions ==--//
};