/**
Project: Make Em Happy
Date: Friday March 13, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy faces happy before the level ends
**/

var game = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv'); // initialize Phaser and create a 960w x 640h game area

var mainState = { // create the 'main' state, contains the game
  
  //this.mouseInputs = 0;

  preload: function() {
    // --== User Interface assets ==--
    game.load.image('frame', 'assets/game_play/frame.png');
    game.load.image('cursor', 'assets/game_play/feather.png');
    
    // --== Game Play assets ==--
    game.load.image('happy', 'assets/game_play/happy.png');
    game.load.image('neutral', 'assets/game_play/neutral.png');
    game.load.image('unhappy', 'assets/game_play/unhappy.png');
    game.load.image('mad', 'assets/game_play/mad.png');
    game.load.image('angry', 'assets/game_play/angry.png');
  }, // preload
  
  create: function() {
    game.stage.backgroundColor = '#DADADA'; // set the background colour to a off white colour
    
    this.mouseInputs = 0;
    
    this.face = game.add.sprite(480, 320, 'happy'); // assign happy face to a variable
    
    this.face.anchor.set(0.5); // move pivot point (anchor) to the centre of the sprite
    this.face.scale.set(0.5); // scale sprite down
    
    this.face.inputEnabled = true; // allow input on sprite
    this.face.input.pixelPerfectClick = true; //ignore the transparent area around the image
    this.face.events.onInputDown.add(this.faceTouched, this); // listen for input on the sprite
        
    game.add.sprite(0, 0, 'frame'); // this is the frame and must be rendered on top of everything
    
    // --== display debug info ==--  
    this.debugText = game.add.text(10, 24, 'debug: ' + this.mouseInputs); // text    
    
  }, // create
  
  update: function() {
  }, // update
  
  faceTouched: function(sprite) {
    this.mouseInputs++;
    this.debugText.text = 'debug: ' + this.mouseInputs;
    
    this.face.x = Math.random() * 920;
    this.face.y = Math.random() * 600;
    this.face.angle = game.rnd.angle();
  },
  
}; // mainState

game.state.add('main', mainState); // add the 'main' state
game.state.start('main'); // start the 'main' state