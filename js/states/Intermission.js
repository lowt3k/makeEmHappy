/**
Project: SlapEm Happy
File: Intermission.js
Date: March 30, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.Intermission = function() {};

SlapEmHappy.Intermission.prototype = {
  /**
  preload: function() {
  }, // end of preload function
  **/
  create: function() {
    this.intermissionTimer = this.game.time.create(true); // create a timer for the intermission
    this.intermissionTimer.add(Phaser.Timer.SECOND * 4, function () { this.game.state.start('GameLoop'); }, this); // add 4 seconds to the timer
    this.intermissionTimer.start(); // start the intermission timer
  }, // end of create function
  /**
  update: function() {
  }, // end of update function
  **/
  render: function() {
    this.debugInfo(); // call the debug info function
  }, // end of render function
  
  // --== My Functions ==-- //
 debugInfo: function() {
    // --== Debug Info ==-- //
    this.game.debug.text('Player\'s Score: ' + playerScore, 16, 16, '#00ff00'); // display player's score
    this.game.debug.text('Level: ' + level, 16, 32, '#00ff00'); // display current level achieved
    this.game.debug.text('Time: ' + this.game.time.totalElapsedSeconds().toFixed(0), 16, 48, '#00ff00'); // display time
    this.game.debug.text('Intermission Time: ' + this.intermissionTimer.duration.toFixed(0), 16, 64, '#00ff00'); // display intermission time
    this.game.debug.text('Intermission');
    // --== End of Debug Info ==-- //
  }, // end of debugInfo function
  // --== End of My Functions ==--//
};