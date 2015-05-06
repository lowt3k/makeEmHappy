/**
Project: SlapEm Happy
File: Preloader.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.Preloader = function(game) {
  this.background = null;
  this.preloaderBar = null;
  
  this.ready = false;
};

SlapEmHappy.Preloader.prototype = {
  
  preload: function() {
    this.rucLogo = this.game.add.sprite(this.world.centerX, this.world.centerY, 'rucLogo');
    this.rucLogo.anchor.setTo(0.5);
//    this.rucLogo.scale.setTo(0.75);
    
    this.loadingText = this.game.add.text(this.world.centerX, this.world.centerY + 96, "Loading...", { font: "bold 24px Arial", fill: "#ffffff", align: "center" }); 
    this.loadingText.anchor.set(0.5); // set the text anchor to the middle of the text 
    
    this.preloaderBarFrame = this.game.add.sprite(this.world.centerX, this.world.centerY + 128, 'preloadBarFrame'); // show the loading bar frame
    this.preloaderBarFrame.anchor.setTo(0.5); // place anchor in the centre of the sprite
    
    this.preloaderBar = this.game.add.sprite(this.world.centerX, this.world.centerY + 128, 'preloadBar'); // show the loading bar
    this.preloaderBar.anchor.setTo(0.5); // place anchor in the centre of the sprite
    this.load.setPreloadSprite(this.preloaderBar); // crop the load bar sprite based on percentage of assets loaded
    
    // -- Game Assets -- //
    /* Audio */
    this.load.audio('music', ['assets/music/Run Amok.mp3', 'assets/music/Run Amok.ogg', 'assets/music/Run Amok.wav']);
    this.load.audio('positive', ['assets/sfx/app_game_interactive_alert_tone_026.mp3', 'assets/sfx/app_game_interactive_alert_tone_026.ogg', 'assets/sfx/app_game_interactive_alert_tone_026.wav']);
    this.load.audio('negative', ['assets/sfx/two_tone_nav.mp3', 'assets/sfx/two_tone_nav.ogg', 'assets/sfx/two_tone_nav.wav']);
    this.load.audio('win', ['assets/sfx/small_studio_crowd_applause.mp3', 'assets/sfx/small_studio_crowd_applause.ogg', 'assets/sfx/small_studio_crowd_applause.wav']);
    this.load.audio('lose', ['assets/sfx/small_group_of_people_booing.mp3', 'assets/sfx/small_group_of_people_booing.ogg', 'assets/sfx/small_group_of_people_booing.wav']);
    this.load.audio('slap', ['assets/sfx/single_face_slap.mp3', 'assets/sfx/single_face_slap.ogg', 'assets/sfx/single_face_slap.wav']);
    this.load.audio('happy', ['assets/sfx/laugh_short_high_pitched_female.mp3', 'assets/sfx/laugh_short_high_pitched_female.ogg', 'assets/sfx/laugh_short_high_pitched_female.wav']);
      
    /* Front End */
    this.load.spritesheet('buttonPlay', 'assets/frontend/buttons/button_play.png', 512, 128, 3); // play button
    this.load.spritesheet('buttonHowToPlay', 'assets/frontend/buttons/button_howtoplay.png', 512, 128, 3); // how to play button
    this.load.spritesheet('buttonQuit', 'assets/frontend/buttons/button_quit.png', 512, 128, 3); // quit button   
    this.load.spritesheet('buttonMainMenu', 'assets/frontend/buttons/button_mainmenu.png', 512, 128, 3); // main menu button
    this.load.image('shapeSheet', 'assets/gameplay/shapes_sheet.png');
    
    /* Logos */
    this.load.image('hcsLogo', 'assets/frontend/logos/HcSLogo.png');
    this.load.image('phaserLogo', 'assets/frontend/logos/PhaserLogo.png');
    this.load.image('htmlLogo', 'assets/frontend/logos/HTML5Logo.png');
    this.load.image('incompetechLogo', 'assets/frontend/logos/2013janlogo.png');
    this.load.image('freeSFXLogo', 'assets/frontend/logos/freesfxlogo.png');
    
    /* HUD */
    this.load.spritesheet('buttonPause', 'assets/hud/button_pause.png', 128, 128, 3); // pause button
    this.load.spritesheet('buttonMute', 'assets/hud/button_mute.png', 128, 128, 3); // mute button
    this.load.spritesheet('buttonCredits', 'assets/hud/button_credits.png', 128, 128, 3); // credits button
    this.load.spritesheet('buttonResume', 'assets/hud/button_resume.png', 512, 128, 3); // resume button
    this.load.spritesheet('hourGlass', 'assets/hud/hourglass.png', 128, 128, 8); // hour glass
    this.load.spritesheet('levelSymbol', 'assets/hud/level.png', 128, 128, 1); // L is for level
    this.load.spritesheet('scoreText', 'assets/hud/score.png', 256, 64, 1); // score text   
    
    /* Game Play*/
    this.load.spritesheet('emoticons', 'assets/gameplay/emoticons_sheet.png', 256, 256, 5); // 1st version of the emoticons
    this.load.spritesheet('shapes', 'assets/gameplay/shapes_sheet.png', 256, 256, 5); // 1st version of the emoticons
    
  }, // end of preload function
  
  create: function() {
    this.preloaderBar.cropEnabled = false; // once the load has finished, disable crop and wait for music to decode

    //this.state.start('MainMenu'); // start the Main Menu state
  }, // end of create function
  
  update: function() {
    if (this.ready == false && this.game.cache.isSoundDecoded('music')) {
      this.ready = true;      
      this.state.start('MainMenu'); // start the preloader state
    }
  } // end of update function
};