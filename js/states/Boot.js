/**
Project: SlapEm Happy
File: Boot.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = {}; // create SlapEmHappy object

SlapEmHappy.Boot = function(game) {};

SlapEmHappy.Boot.prototype = {
  int: function() {
    this.input.maxPointers = 1; // allow only one input
    
    this.stage.disableVisibilityChange = true;
    
    if (this.game.device.desktop) { // check if user is playing from destop or mobile
      this.scale.pageAlignHorizontally = true; // align the game horizontally
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768); // set the min and max resolutions
      this.scale.forceLandscape = true; // force game into landscape mode
      this.scale.pageAlignHorizontally = true; // align the game horizontally      
    }
  }, // end of init function
  
  preload: function() {
    //this.load.image('key', 'file');
    this.load.image('phaserLogo', 'assets/frontend/logos/PhaserLogo.png');
    this.load.image('htmlLogo', 'assets/frontend/logos/HTML5Logo.png');
    
    this.load.image('hcsLogo', 'assets/frontend/logos/HcSLogo.png');
    this.load.image('preloadBarFrame', 'assets/frontend/extras/preloadbar_frame.png');
    this.load.image('preloadBar', 'assets/frontend/extras/preloadbar.png');
  }, // end of preload function
  
  create: function() {    
    this.game.stage.backgroundColor = '#336699'; // set loading screen to black
    
    this.state.start('Preloader'); // start the preloader state
  } // end of create function
};