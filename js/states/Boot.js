/**
Project: SlapEm Happy
File: Boot.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.Boot = function() {};

SlapEmHappy.Boot.prototype = {
  
  preload: function() {
    //this.load.image('key', 'file');
    this.load.image('hcsLogo', 'assets/frontend/preload/HcS_Logo256.png');
    this.load.image('preloadBar', 'assets/frontend/preload/preloadbar.png');
  }, // end of preload function
  
  create: function() {
    this.game.stage.backgroundColor = '#000000'; // set loading screen to black
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // show the entire game
    
    this.scale.minWidth = 320; // set minimum width and height
    this.scale.minHeight = 240;
      
    this.scale.maxWidth = 2048; // set max width and height
    this.scale.maxHeight = 1536;
    
    this.scale.pageAlignHorizontally = true; // align horizontally   
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE); // start the Arcade physics system
    
    this.state.start('Preloader'); // start the preloader state
  }, // end of create function
  /**
  update: function() {
  }, // end of update function
  
  render: function() {
  }, // end of render function  
  **/
};