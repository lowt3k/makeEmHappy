/**
Project: SlapEm Happy
File: Preloader.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

// -- Global Variables -- //
var playerScore = 0; // set player's score to 0
var level = 0; // level
// -- End of Global Variables -- //

SlapEmHappy.Preloader = function() {};

SlapEmHappy.Preloader.prototype = {
  
  preload: function() {    
    this.splashSCR = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'hcsLogo'); // show HcS Logo
    this.splashSCR.anchor.setTo(0.5); // place anchor in the centre of the sprite
    
    this.preloaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 160, 'preloadBar'); // show the loading bar
    this.preloaderBar.anchor.setTo(0.5); // place anchor in the centre of the sprite
    this.load.setPreloadSprite(this.preloaderBar); // crop the load bar sprite based on percentage of assets loaded
    
    // -- Game Assets -- //
    this.load.spritesheet('emoticons', 'assets/gameplay/emoticons_sheet.png', 256, 256, 5); // 1st version of the emoticons
    
  }, // end of preload function
  
  create: function() {
    this.state.start('MainMenu'); // start the Main Menu state
  }, // end of create function
  /**
  update: function() {
  }, // end of update function
  
  render: function() {
  }, // end of render function
  **/
};