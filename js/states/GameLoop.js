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
    this.level = 1; // increase the level by one
    this.playerScore = 0;
    
    //if (Phaser.Math.isOdd(level)) tt++; // temp variable for debug
    
    this.levelTimer = 0; // holds the level timer
    this.levelTimerStartTime = this.game.time.totalElapsedSeconds(); // caputre the current elapsed game time
    this.levelTimerDuration = 10; // how long in seconds the level timer is
    this.levelCoolDownTimer = 0;    
    this.levelCoolDownTimerDuration = 2;
    this.levelScore = 0; // score for the current level
    
    this.targetsHitArray = []; // array for holding the hits for each target
    
    this.targetActiveFrame = 0; // current frame of the target hit
    this.targetActiveName = ''; // name of the the target hit
    this.targetHitCount = 0; // number of times the targets has been hit    
    
    this.targetCreate(); // calls the targetCreate() function which creates the targets
    
    this.hudGroup = this.game.add.group();   
    
    this.pauseGameHUD();
  }, // end of create function
  
  update: function() {
    this.levelTimer = this.levelTimerDuration - (this.game.time.totalElapsedSeconds() - this.levelTimerStartTime);
    this.levelCoolDownTimer = this.levelCoolDownTimerDuration - (this.game.time.totalElapsedSeconds() - this.levelCoolDownTimerStartTime);
    
    if (this.levelTimer <= 0) this.levelOver();
  }, // end of update function
  
  render: function() {
    this.debugInfo(); // display the debug info
  }, // end of render function
  
  // --== My Functions ==-- //
  targetCreate: function() {
    this.temp = this.level % 2;
    
    for (var i = 0; i < this.level; i++) { // loop to create multiple targets
      this.target = this.game.add.sprite(-256, -256, 'emoticons'); // add target sprite sheet to this.target off screen

      this.target.name = i; // give each target a name based on the loop index
      
      this.targetSetup(this.target); // set the position, rotation of the targets

      this.target.inputEnabled = true; // allow input on sprite
      this.target.input.pixelPerfectClick = true; // ignore the transparent area around the sprite
      this.target.events.onInputDown.add(this.targetInput, this); // listen for input on the sprite
      
      this.targetsHitArray[i] = 0; // set the number of hits for the target to 0      
    }    
  }, // end of targetSetup function
  
  targetSetup: function(thisTarget) {
    if (thisTarget.alpha == 0) { // determine if the alpha is 0 and...
      this.game.add.tween(thisTarget).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 0, false); // fade the target in to view
    } else {
      thisTarget.alpha = 1; // if alpha isn't 0 set it to 1
    }
    
    thisTarget.frame = this.game.rnd.integerInRange(1, 4); // randomly pick a frame from neutral to angry
    
    thisTarget.anchor.set(0.5); // set anchor to the centre of the sprite
    thisTarget.scale.set(0.75); // scale sprite down
    
    thisTarget.x = this.game.rnd.integerInRange(thisTarget.width / 2, this.game.world.width - (thisTarget.width / 2)); // randomly position target along X within the game world
    thisTarget.y = this.game.rnd.integerInRange(thisTarget.height / 2, this.game.world.height - (thisTarget.height / 2)); // randomly position target along Y within the game world
    
    thisTarget.angle = this.game.rnd.angle(); // randomly set the angle of the target
  }, // end of setupTarget function
  
  targetInput: function(selectedTarget) {
    var tweenFade = this.game.add.tween(selectedTarget).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 0, false); // fade the happy face away after the final hit
    
    this.targetActiveFrame = selectedTarget.frame; // set the frame of selected target to this.targetActiveFrame for use outside this function
    this.targetActiveName = selectedTarget.name; // set the frame of selected target to this.targetActiveName for use outside this function
    
    //this.temp = tweenFade.properties;
    
    if (selectedTarget.frame == 0) { // check if the target is displaying the first frame, frame 0 in the spritesheet
      this.levelScore++;
      this.playerScore++; // increase player's score, they've made a target happy
      
      this.levelTimerDuration++;
      
      tweenFade.start(); // start the tween fade
     
      tweenFade.onComplete.add(this.targetSetup, selectedTarget); // when the fade is complete reposition the target
      
      this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame


    } else if (this.targetsHitArray[selectedTarget.name] == (selectedTarget.frame)) { // if the target isn't happy change it on input
      this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame
      
      selectedTarget.frame--; // change to the pervious target
    } else {
      this.targetsHitArray[selectedTarget.name]++; // increase the hit count for the specific target insde the array
    }
  }, // end of inputOnTarget function
  
  levelOver: function() {
    this.levelCoolDownTimerStartTime = this.game.time.totalElapsedSeconds();
        
    if (this.levelScore >= this.level) {
      this.level++;
      this.levelScore = 0;
      
      this.levelTimerDuration = 10;
      this.levelTimerStartTime = this.game.time.totalElapsedSeconds();
    } else {
      this.game.state.start('MainMenu', true, false, this.playerScore, this.level);
    }
  },
  
  pauseGameHUD: function() {    
    var buttonPause = this.game.make.button(this.game.width, 0, 'buttonPause', function() { this.game.paused = true; }, this, 0, 1, 2);

    buttonPause.anchor.set(1.0, 0.0); // set the play button anchor in the middle 
    buttonPause.scale.set(0.5); // scale pause button to 50%
    
    this.hudGroup.add(buttonPause);
    
    this.game.input.onDown.add(function() { if (this.game.paused) this.game.paused = false; }, this);
  }, // end of gamePlayHUD function
  
  debugInfo: function() {
    // --== Debug Info ==-- //
    this.game.debug.text('Player\'s Score: ' + this.playerScore, 16, 16); // display player's score
    this.game.debug.text('Level: ' + this.level, 16, 32); // display current level achieved
    this.game.debug.text('Time: ' + this.game.time.totalElapsedSeconds().toFixed(0), 16, 48); // display time
    this.game.debug.text('Level Time: ' + this.levelTimer.toFixed(0), 16, 64); // display level time
    this.game.debug.text('Level Score: ' + this.levelScore, 16, 80); // empty debug text line
    this.game.debug.text('-', 16, 96); // empty debug text line    
    this.game.debug.text('Target\'s Name: ' + this.targetActiveName, 16, 112); // display name of the target hit
    this.game.debug.text('Target\'s Frame: ' + this.targetActiveFrame, 16, 128); // display the current frame of the target hit
    this.game.debug.text('Target\'s Hit Count: ' + this.targetsHitArray[this.targetActiveName], 16, 144); // display how many hits on the target hit
    this.game.debug.text('-', 16, 160); // empty debug text line
    this.game.debug.text('Intermission Timer: ' + this.levelCoolDownTimer.toFixed(0), 16, 176); // empty debug text line
    this.game.debug.text('-', 16, 192); // empty debug text line
    this.game.debug.text('# of Targets: ' + this.targetsHitArray.length, 16, 208); // display total number of targets    
    this.game.debug.text('Targets Hit Array: ' + this.targetsHitArray, 16, 224); // display the array of hits on all the targets
    // --== End of Debug Info ==-- //
  }, // end of debugInfo function
  // --== End of My Functions ==--// 
};