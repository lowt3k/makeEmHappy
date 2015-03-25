/**
Project: Slap Em Happy
File: boot.js
Date: Friday March 24, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends
**/

var slapEmHappy = {}; // object that will hold all game states
var playMusic = true; // toggle to control music across all states

slapEmHappy.Boot = function(game) {
};

slapEmHappy.Boot.prototype = {
  
  preload: function() {
    // insert assets here
    // this.load.image('name', 'location');
    this.load.image('preloaderBarBG', 'assets/ui/screens/preload_bar_bg.png');
    this.load.image('preloaderBar', 'assets/ui/screens/preload_bar.png');
    
  }, // end of preload
  
  create: function() {
    if(this.game.device.desktop) { // check if playing on desktop
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // always show the whole game
      this.scale.pageAlignHorizontally = true; // align horizontally
    } else {
      // not desktop,ie mobile
      // add common resolutions here, min and max
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      this.scale.minWidth = 320; // set minimum width and height
      this.scale.minHeight = 240;
      
      this.scale.maxWidth = 2048; // set max width and height
      this.scale.maxHeight = 1536;
      
      this.scale.forceLandscape = true; // set to landscape mode
      this.scale.pageAlignHorizontally = true; // align horizontally
    } // end of if
    
    this.scale.setScreenSize(true);
    
    this.state.start('Preloader');
  }, // end of create
}; // end of Boot.prototype