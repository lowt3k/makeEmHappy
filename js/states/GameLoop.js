/**
Project: SlapEm Happy
File: GameLoop.js
Date: March 27, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.GameLoop = function(game) {};

SlapEmHappy.GameLoop.prototype = {
  
  init: function(score, level, targetTotal, targetFrameLimit) { // receive score and level from intermission state
    this.playerScore = score || 0; // check and assign value to player score
    
    this.level = level || 1; // check and assign value to level
    
    this.targetsTotal = targetTotal || 0; // assign value to targetsTotal
    
    this.targetFrameLimit = targetFrameLimit || 0; // assign to targetFrameLimit
  }, // end of init function

//  preload: function() {
//  }, // end of preload function

  create: function() {
    this.levelTime = 0; // holds the level time
    this.levelStartTime = this.time.totalElapsedSeconds(); // caputre the current elapsed game time
    this.levelScore = 0; // score for the current level
    
    this.countDownTimer = 0; // timer for displaying level time remaining
    this.countDownDuration = 10; // lenght of the gameplay level
    
    this.targetsHitArray = []; // array for holding the hits for each target    
    this.targetsCreated = false; // flag for allowing the targets to be created
    this.targetsIncreaseInterval = 2; // rate at which the # of targets increase
    
    this.targetActiveFrame = 0; // current frame of the target hit
    this.targetActiveName = ''; // name of the the target hit
    this.targetHitCount = 0; // number of times the targets has been hit
    this.targetFrameIncreaseInterval = 3; // rate at which the target's frame range changes
    this.targetMinFrame = 0; // lowest frame
    this.targetMaxFrame = 1; // highest frame
    
    this.gameplayIsPaused = false; // used to enable/disable gameplay
    this.gameplayPauseTime = 0; // amount of time gameplay was paused

    this.gameplayHUD(); // call gameplayHUD function to draw the hud elements
    this.levelDifficulty(); // set the level difficulty
  }, // end of create function
  
  update: function() {   
    this.countDownTimerText.text = this.countDownTimer.toFixed(0); // hud text, how much time is left in the level
    
    if (!this.gameplayIsPaused) { // check if gameplay is paused
      this.levelTime = (this.time.totalElapsedSeconds() - this.levelStartTime) - this.gameplayPauseTime; // level timer
      this.countDownTimer = this.countDownDuration - this.levelTime; // level timer
    }
    
    if (this.countDownTimer > 0) { // level timer is greater then 0, we're in gameplay
      if (!this.targetsCreated && !this.gameplayIsPaused) // check if the targets have been created and gameplay is not paused
        this.targetCreate(); // calls the targetCreate() function which creates the targets
    } else { // level timer has ran out, end current level
      this.levelOver(); // call the levelOver function
    }
    
    if (this.levelScore < this.level) {
      this.levelScoreText.addColor('#ff6633', 0);
    } else if (this.levelScore >= this.level) {
      this.levelScoreText.addColor('#33cc33', 0);
    }
    this.levelScoreText.text = this.levelScore + " : " + this.level;
    
    // this.targetShake(this.target);
  }, // end of update function
  
  render: function() {
//    this.debugInfo(); // display the debug info
  }, // end of render function
  
  // --== My Functions ==-- //
  gameplayHUD: function() {
    var positiveSFX = this.add.audio('positive');
    var negativeSFX = this.add.audio('negative');
    
    this.hudGroup = this.add.group(); // create a group to hold the hud elements
    
    var buttonPause = this.add.button(this.world.width, 0, 'buttonPause', this.gameplayPause, this, 0, 1, 2); // create a pause button in the top right corner    
    buttonPause.anchor.set(1.0, 0.0); // set the play button anchor in the middle 
    
    buttonPause.scale.set(0.5); // scale pause button to 50%    
    buttonPause.onInputDown.add(function() { buttonPause.visible = false; buttonResume.visible = true; buttonMainMenu.visible = true;  }, this); // change visiblility of the pause and resume buttons
    buttonPause.setDownSound(negativeSFX);
    
    var buttonResume = this.add.button(this.world.centerX, this.world.centerY, 'buttonResume', this.gameplayPause, this, 0, 1, 2); // create a resume button in the middle of the screen
    buttonResume.anchor.set(0.5); // set anchor to the centre
    buttonResume.visible = false; // turn off visiblility
    buttonResume.onInputDown.add(function() { buttonPause.visible = true; buttonResume.visible = false; buttonMainMenu.visible = false }, this); // change visiblility of the resume and pause buttons
    buttonResume.setDownSound(positiveSFX);
    
    var buttonMainMenu = this.add.button(this.world.centerX, this.world.centerY + 144, 'buttonMainMenu', function() { this.state.start('MainMenu', true, false, this.playerScore, this.level, true); }, this, 0, 1, 2);
    buttonMainMenu.anchor.set(0.5); // set the play button anchor in the middle
    buttonMainMenu.visible = false; // turn off visiblility
    buttonMainMenu.setDownSound(negativeSFX);
    
    this.hudGroup.add(buttonPause, buttonResume, buttonMainMenu);
    
    var hourGlass = this.add.sprite(16, 16, 'hourGlass', 0);
    hourGlass.scale.set(0.5);
    hourGlass.anchor.set(0.35, 0.25);
    //this.hourGlassRotate = this.hourGlass.animations.add('rotate');
    //this.hourGlassRotate.play(1, true);
    
    var hudTextStyle = { font: "bold 32px Arial", fill: "#dddddd", align: "center" }; // hud text style
    
    this.countDownTimerText = this.add.text(16, 16, "0", hudTextStyle); // hud text for level time
    this.countDownTimerText.anchor.set(0, 0); // anchor placed middle top
    
    this.levelScoreText = this.add.text(this.world.centerX, 32, "0", hudTextStyle); // hud text for level score
    this.levelScoreText.anchor.set(0.5, 0); // anchor placed middle top
    
    var scoreText = this.add.sprite(this.world.centerX, 16, 'scoreText', 0);
    scoreText.anchor.set(0.5, 0.25);
  }, // end of gamePlayHUD function
  
  levelDifficulty: function() {
    this.targetsTotal += this.level % this.targetsIncreaseInterval; // increase number of targets based on level
    
    if (((this.level % this.targetFrameIncreaseInterval) == 0) && this.targetFrameLimit <= 3) // used to change the frame range
      this.targetFrameLimit++; // change the frame range
    
    this.targetMinFrame += this.targetFrameLimit; // change the low end
    this.targetMaxFrame += this.targetFrameLimit; // change the high end

  }, // end of levelDifficulty function
  
  targetCreate: function() {    
    this.targetGroup = this.add.group(); // create a group to hold the targets
    this.targetShakeCount = 0;
        
    for (var i = 0; i < this.targetsTotal; i++) { // loop to create multiple targets
      this.target = this.add.sprite(-256, -256, 'shapes'); // add target sprite sheet to this.target off screen

      this.target.name = i; // give each target a name based on the loop index
      
      this.targetSetup(this.target); // set the position, rotation of the targets

      this.target.inputEnabled = true; // allow input on sprite
      this.target.input.pixelPerfectClick = true; // ignore the transparent area around the sprite
      this.target.events.onInputDown.add(this.targetInput, this); // listen for input on the sprite
      
      this.targetsHitArray[i] = 0; // set the number of hits for the target to 0
      
      this.targetGroup.add(this.target); // add target to the target group
    }
    
    this.targetsCreated = true; // targets have been created
  }, // end of targetSetup function
  
  targetSetup: function(currentTarget) {
    currentTarget.frame = this.rnd.integerInRange(this.targetMinFrame, this.targetMaxFrame); // randomly pick a frame
    
    currentTarget.anchor.set(0.5); // set anchor to the centre
    currentTarget.scale.set(0.75); // scale sprite down
    
    currentTarget.x = this.rnd.integerInRange(currentTarget.width / 2, this.world.width - (currentTarget.width / 2)); // randomly position target along X within the game world
    currentTarget.y = this.rnd.integerInRange(currentTarget.height / 2, this.world.height - (currentTarget.height / 2)); // randomly position target along Y within the game world
    
    currentTarget.angle = this.rnd.angle(); // randomly set the angle of the target
  }, // end of setupTarget function
  
  targetInput: function(selectedTarget) {
    var happySFX = this.add.audio('happy');
    happySFX.addMarker('laugh', 0, 0.5);
    var slapSFX = this.add.audio('slap');
    
    this.targetActiveFrame = selectedTarget.frame; // set the frame of selected target to this.targetActiveFrame for use outside this function
    this.targetActiveName = selectedTarget.name; // set the frame of selected target to this.targetActiveName for use outside this function
    
    if (!this.gameplayIsPaused) {
      if (selectedTarget.frame == 0) { // check if the target is displaying the first frame, frame 0 in the spritesheet
        if (!happySFX.isPlaying) happySFX.play('laugh');
        this.levelScore++; // increase current level score, reset to 0 every level
        this.countDownDuration += 0.5; // player has removed a target, reward them by adding more time to level time

        this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame
        
        this.targetSetup(selectedTarget); // reposition the target

      } else if (this.targetsHitArray[selectedTarget.name] == selectedTarget.frame) { // if the target isn't happy change it on input
        if (!slapSFX.isPlaying) slapSFX.play();
        this.targetsHitArray[selectedTarget.name] = 0; // reset hit counter, used to count the number of hits for each frame

        selectedTarget.frame--; // change to the pervious target
      } else {
        if (!slapSFX.isPlaying) slapSFX.play();
        this.targetsHitArray[selectedTarget.name]++; // increase the hit count for the specific target insde the array
      }
    }
  }, // end of inputOnTarget function
  
  targetShake: function(selectedTarget) {    
    if (this.targetShakeCount > 0) {
      var randomX = this.rnd.integerInRange(-5, 5);
      var randomY = this.rnd.integerInRange(-5, 5);
      
      selectedTarget.x += randomX;
      selectedTarget.y += randomY;
      
      this.targetShakeCount--;
      
      if (this.targetShakeCount == 0) {
        selectedTarget.x = selectedTarget.x;
        selectedTarget.y = selectedTarget.y;
      }
    }    
  },
  
  gameplayPause: function() {    
    if (!this.gameplayIsPaused) { // check is gameplay paused
      this.gameplayIsPaused = true; // pause gameplay
    } else {
      this.gameplayPauseTime = this.time.totalElapsedSeconds() - (this.levelTime + this.levelStartTime); // capture the time gameplay was unpaused   
      this.gameplayIsPaused = false; // unpause gameplay
    }
  }, // end of gameplayPause
  
  levelOver: function() {
    var levelWinSFX = this.add.audio('win');
    var levelLoseSFX = this.add.audio('lose');
    
    if (this.levelScore >= this.level) { // check level score is equal or greater then current level (force player to score each level)
      if (!levelWinSFX.isPlaying) levelWinSFX.play();
      this.level++; // increase level by 1
      
      this.playerScore += this.levelScore; // add level score to player's total score
      
      this.targetGroup.destroy(); // destroy the target group     
      
      this.state.start('Intermission', true, false, this.playerScore, this.level, this.targetsTotal, this.targetFrameLimit); // call the intermission state
    } else {
      if (!levelLoseSFX.isPlaying) levelLoseSFX.play();
      this.state.start('MainMenu', true, false, this.playerScore, this.level); // call the main menu state
    }
  },
  
  debugInfo: function() {
    // --== Debug Info ==-- //
    this.debug.text('Player\'s Score: ' + this.playerScore, 16, 16); // display player's score
    this.debug.text('Level: ' + this.level, 16, 32); // display current level achieved
    this.debug.text('Time: ' + this.time.totalElapsedSeconds().toFixed(3), 16, 48); // display time
    this.debug.text('Level Time: ' + this.levelTime.toFixed(3), 16, 64); // display level time
    this.debug.text('Level Score: ' + this.levelScore, 16, 80); // empty debug text line
    this.debug.text('-', 16, 96); // empty debug text line    
    this.debug.text('Count Down Timer: ' + this.countDownTimer.toFixed(3), 16, 112); // display name of the target hit
    this.debug.text('Level % ' + this.targetFrameIncreaseInterval + ': ' + this.level % this.targetFrameIncreaseInterval, 16, 128); // display the current frame of the target hit
    this.debug.text('Target Min Frame: ' + this.targetMinFrame, 16, 144); // display how many hits on the target hit
    this.debug.text('Target Max Frame: ' + this.targetMaxFrame, 16, 160); // empty debug text line
    this.debug.text('Target Frame Limit: ' + this.targetFrameLimit, 16, 176); // empty debug text line
    this.debug.text('-', 16, 192); // empty debug text line
    this.debug.text('# of Targets: ' + this.targetsHitArray.length, 16, 208); // display total number of targets    
    this.debug.text('Targets Hit Array: ' + this.targetsHitArray, 16, 224); // display the array of hits on all the targets
    // --== End of Debug Info ==-- //
  }, // end of debugInfo function
  // --== End of My Functions ==--// 
};