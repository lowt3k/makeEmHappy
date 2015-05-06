/**
Project: SlapEm Happy
File: Credits.js
Date: April 27, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

SlapEmHappy.Credits = function(game) {};

SlapEmHappy.Credits.prototype = {
  
  create: function() {
    var positiveSFX = this.add.audio('positive');
    var negativeSFX = this.add.audio('negative');
    
    var style = { font: "bold 18px Arial", fill: "#dddddd", align: "center" };
    
    var hcsLogo = this.game.add.sprite(this.world.centerX, this.world.centerY - 256, 'hcsLogo'); // show HcS Logo
    hcsLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    hcsLogo.scale.setTo(0.5);
    
    var phaserLogo = this.game.add.sprite(this.world.centerX + 320, this.world.centerY - 200, 'phaserLogo'); // show HcS Logo
    phaserLogo.scale.setTo(0.75);
    phaserLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    phaserLogo.inputEnabled = true;
    phaserLogo.events.onInputDown.add(function() { window.location.href = "http://phaser.io/"; });    
    
    var htmlLogo = this.game.add.sprite(this.world.centerX - 320, this.world.centerY - 200, 'htmlLogo'); // show HcS Logo
    htmlLogo.scale.setTo(0.75);
    htmlLogo.anchor.setTo(0.5); // place anchor in the centre of the sprite
    htmlLogo.inputEnabled = true;
    htmlLogo.events.onInputDown.add(function() { window.location.href = "https://en.wikipedia.org/wiki/HTML5"; });    
        
        
    var incompetech = this.add.image(this.game.world.centerX, this.game.world.centerY - 144, 'incompetechLogo');
    incompetech.anchor.setTo(0.5);
    incompetech.inputEnabled = true;
    incompetech.events.onInputDown.add(function() { window.location.href = "http://incompetech.com/wordpress/"; });
    
    var incompetechLegal = "Run Amok by Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0\nhttp://creativecommons.org/licenses/by/3.0/";
    var incompetechText = this.add.text(this.game.world.centerX, this.game.world.centerY - 80, incompetechLegal, style);
    incompetechText.anchor.setTo(0.5);
    
    var freeSFX = this.add.image(this.game.world.centerX, this.game.world.centerY + 16, 'freeSFXLogo');
    freeSFX.anchor.setTo(0.5);
    freeSFX.inputEnabled = true;
    freeSFX.events.onInputDown.add(function() { window.location.href = "http://www.freesfx.co.uk/"; });    
    
    var buttonMainMenu = this.add.button(this.game.width / 2, (this.game.height / 2) + 144, 'buttonMainMenu', function() { this.game.state.start('MainMenu', true, false, this.playerScore, this.level, true); }, this, 0, 1, 2);
    buttonMainMenu.anchor.set(0.5); // set the play button anchor in the middle
    buttonMainMenu.setDownSound(negativeSFX);
    
    this.mainMenuButtonGroup = this.add.group();
    
    this.mainMenuButtonGroup.add(buttonMainMenu);
  }, // end of create function
};