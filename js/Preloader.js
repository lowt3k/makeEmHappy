/**
Project: Slap Em Happy
File: preloader.js
Date: Friday March 24, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends
**/

slapEmHappy.Preloader = function(game) {
  this.background = null;
  this.preloadBar = null;
  
  this.ready = false;
};

slapEmHappy.Preloader.prototype = {
  
  preload: function() {
    this.preloadBarBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBarBG');
    this.preloadBarBackground.anchor.setTo(0.5, 0.5);
    this.preloadBarBackground.scale.setTo(0.5, 0.5);
    
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.preloadBar.scale.setTo(0.5, 1);
    this.preloadBar.x = this.world.centerX - this.preloadBar.width / 2;
    
    this.load.setPreloadSprite(this.preloadBar);
    
    this.load.image('largeFile', 'assets/OrangeKangaroo.png');
  }, // end of preload
  
  create: function() {
  }, // end of create
  
  update: function() {
    //this.state.start('MainMenu'); // start the main menu state
  }, // end of update
  
}; // end of Preloader.prototype

/*
    game.load.spritesheet('targets', 'assets/game_play/faces_sheet.png', 256, 256, 5); // load a sprite sheet with all five targets
    this.target = game.add.sprite(game.world.randomX, game.world.randomY, 'targets'); // assign happy target to a variable
    
    this.target.frame = game.rnd.integerInRange(1, 4); // randomly pick a frame from neutral to angry 
    
    this.target.anchor.set(0.5); // move pivot point (anchor) to the centre of the sprite
    this.target.scale.set(0.5); // scale sprite down
    
    this.target.inputEnabled = true; // allow input on sprite
    this.target.input.pixelPerfectOver = true; //ignore the transparent area around the image
    //this.target.events.onInputOver.add(this.targetTouched, this); // listen for input on the sprite
 */