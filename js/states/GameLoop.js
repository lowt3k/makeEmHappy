/**
Project: SlapEm Happy
File: GameLoop.js
Date: March 27, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.GameLoop = function() {};

SlapEmHappy.GameLoop.prototype = {
  /**
  preload: function() {
  }, // end of preload function
  **/
  create: function() {
    level++; // increase the level by one
    
    this.levelTimer = this.game.time.create(true); // create a level timer
    this.levelTimer.add(Phaser.Timer.SECOND * 5, this.endOfLevel, this); // add 5 seconds to the level timer
    
    this.targetsHitArray = []; // array for holding the hits for each target
    
    this.targetActiveFrame = 0; // current frame of the target hit
    this.targetActiveName = ''; // name of the the target hit
    this.targetHitCount = 0; // number of times the targets has been hit    
    
    this.targetCreate(); // calls the targetCreate() function which creates the targets
    
    this.levelTimer.start(); // start the level timer    
  }, // end of create function
  
  update: function() {
  }, // end of update function
  
  render: function() {
    this.debugInfo(); // display the debug info
  }, // end of render function
  
  // --== My Functions ==-- //
  targetCreate: function() {
    for (var i = 0; i < level; i++) { // loop to create multiple targets
      this.target = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'emoticons'); // add target sprite sheet to this.target

      this.target.name = i; // give each target a name based on the loop index

      this.target.frame = this.game.rnd.integerInRange(1, 4); // randomly pick a frame from neutral to angry 

      this.target.anchor.set(0.5); // set anchor to the centre of the sprite
      this.target.scale.set(0.75); // scale sprite down

      //this.game.physics.arcade.enable(this.target); // enable arcade physics on the target

      this.target.inputEnabled = true; // allow input on sprite
      this.target.input.pixelPerfectClick = true; // ignore the transparent area around the sprite
      this.target.events.onInputDown.add(this.inputOnTarget, this); // listen for input on the sprite
      
      this.targetsHitArray[i] = 0; // set the number of hits for the target to 0
    }
  }, // end of targetSetup function
  
  inputOnTarget: function(selectedTarget) {
    this.targetActiveFrame = selectedTarget.frame; // set the frame of selected target to this.targetActiveFrame for use outside this function
    this.targetActiveName = selectedTarget.name; // set the frame of selected target to this.targetActiveName for use outside this function
    
    if (selectedTarget.frame == 0) { // check if the target is displaying the first frame, frame 0 in the spritesheet
      this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame   
      
      selectedTarget.frame = this.game.rnd.integerInRange(1, 4); // randomly set the frame from neutral to angry

      selectedTarget.x = this.game.world.randomX; // randomly position target along X within the game world
      selectedTarget.y = this.game.world.randomY; // randomly position target along Y within the game world

      selectedTarget.angle = this.game.rnd.angle(); // randomly set the angle of the target
      
      playerScore++; // increase player's score, they've made a target happy
    } else if (this.targetsHitArray[selectedTarget.name] == (selectedTarget.frame)) { // if the target isn't happy change it on input
      this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame
      
      selectedTarget.frame--; // change to the pervious target
    } else {
      this.targetsHitArray[selectedTarget.name]++; // increase the hit count for the specific target insde the array
    }
  }, // end of inputOnTarget function
  
  endOfLevel: function() {
    this.game.state.start('Intermission'); // start the intermission state, happens after level time reaches zero
  }, // end of endOfLevel function
  
  debugInfo: function() {
    // --== Debug Info ==-- //
    this.game.debug.text('Player\'s Score: ' + playerScore, 16, 16, '#00ff00'); // display player's score
    this.game.debug.text('Level: ' + level, 16, 32, '#00ff00'); // display current level achieved
    this.game.debug.text('Time: ' + this.game.time.totalElapsedSeconds().toFixed(0), 16, 48, '#00ff00'); // display time
    this.game.debug.text('Level Time: ' + this.levelTimer.duration.toFixed(0), 16, 64, '#00ff00'); // display level time
    this.game.debug.text('-', 16, 80, '#00ff00'); // empty debug text line
    this.game.debug.text('-', 16, 96, '#00ff00'); // empty debug text line    
    this.game.debug.text('Target\'s Name: ' + this.targetActiveName, 16, 112, '#00ff00'); // display name of the target hit
    this.game.debug.text('Target\'s Frame: ' + this.targetActiveFrame, 16, 128, '#00ff00'); // display the current frame of the target hit
    this.game.debug.text('Target\'s Hit Count: ' + this.targetsHitArray[this.targetActiveName], 16, 144, '#00ff00'); // display how many hits on the target hit
    this.game.debug.text('-', 16, 160, '#00ff00'); // empty debug text line
    this.game.debug.text('-', 16, 176, '#00ff00'); // empty debug text line
    this.game.debug.text('-', 16, 192, '#00ff00'); // empty debug text line
    this.game.debug.text('Targets Total: ' + this.targetsHitArray.length, 16, 208, '#00ff00'); // display total number of targets    
    this.game.debug.text('Targets Hit Array: ' + this.targetsHitArray, 16, 224, '#00ff00'); // display the array of hits on all the targets
    // --== End of Debug Info ==-- //
  }, // end of debugInfo function
  // --== End of My Functions ==--//
};