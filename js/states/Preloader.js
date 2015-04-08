/**
Project: SlapEm Happy
File: Preloader.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.Preloader = function() {};

SlapEmHappy.Preloader.prototype = {
  
  preload: function() {    
    this.hcsLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'hcsLogo'); // show HcS Logo
    this.hcsLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    
    this.phaserLogo = this.add.sprite(this.game.world.centerX + 256, this.game.world.centerY, 'phaserLogo'); // show HcS Logo
    this.phaserLogo.scale.setTo(0.75);
    this.phaserLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    
    this.htmlLogo = this.add.sprite(this.game.world.centerX - 256, this.game.world.centerY, 'htmlLogo'); // show HcS Logo
    this.htmlLogo.scale.setTo(0.75);
    this.htmlLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    
    this.preloaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 160, 'preloadBar'); // show the loading bar
    this.preloaderBar.anchor.setTo(0.5); // place anchor in the centre of the sprite
    this.load.setPreloadSprite(this.preloaderBar); // crop the load bar sprite based on percentage of assets loaded
    
    // -- Game Assets -- //
    /* Front End */
    this.load.spritesheet('buttonPlay', 'assets/frontend/buttons/button_play.png', 512, 128, 3); // play button
    this.load.spritesheet('buttonHowToPlay', 'assets/frontend/buttons/button_howtoplay.png', 512, 128, 3); // how to play button
    this.load.spritesheet('buttonQuit', 'assets/frontend/buttons/button_quit.png', 512, 128, 3); // quit button   
    
    /* HUD */
    this.load.spritesheet('buttonPause', 'assets/hud/button_pause.png', 512, 128, 3); // pause button   
    
    /* Game Play*/
    this.load.spritesheet('emoticons', 'assets/gameplay/emoticons_sheet.png', 256, 256, 5); // 1st version of the emoticons
    
  }, // end of preload function
  
  create: function() {
    //this.state.start('MainMenu'); // start the Main Menu state
  }, // end of create function
  
  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.state.start('MainMenu'); // start the preloader state
    }
  }, // end of update function
  /**
  render: function() {
  }, // end of render function
  **/
};