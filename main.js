/**
Project: Make Em Happy
Date: Friday March 13, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy faces happy before the level ends
**/

var game = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv'); // initialize Phaser and create a 960w x 640h game area

var mainState = { // create the 'main' state, contains the game  
  preload: function() {
    // --== User Interface assets ==--
    
    // --== Game Play assets ==--
    game.load.spritesheet('faces', 'assets/game_play/faces_sheet.png', 256, 256, 5); // load a sprite sheet with all five faces
  }, // preload
  
  create: function() {
    game.stage.backgroundColor = '#DADADA'; // set the background colour to a off white colour
    
    this.mouseInputs = 0; // total number of inputs received
    this.slapCount = 0; // current number of slaps the current face has received
    this.levelCount = 0; // current number of levels passed
    this.gamePlayActive = true; // check if game play is currently active
    this.countDownActive = false; // check if the count down timer is currently active
    
    this.levelTimer = game.time.create(false); // create a game play timer for the levels   
    this.levelTimer.loop(Phaser.Timer.SECOND * 30, this.startIntermission, this); // set duration to 30 seconds and call the intermission    
    
    this.countDownTimer = game.time.create(false); // timer for the count down
    this.countDownTimer.loop(Phaser.Timer.SECOND * 4, this.startGamePlay, this); // duration 4 seconds and call game play
    
    this.face = game.add.sprite(480, 320, 'faces'); // assign happy face to a variable
    
    this.face.frame = game.rnd.integerInRange(1, 4); // randomly pick a frame from neutral to angry 
    
    this.face.anchor.set(0.5); // move pivot point (anchor) to the centre of the sprite
    this.face.scale.set(0.5); // scale sprite down
    
    this.face.inputEnabled = true; // allow input on sprite
    this.face.input.pixelPerfectClick = true; //ignore the transparent area around the image
    this.face.events.onInputOver.add(this.faceTouched, this); // listen for input on the sprite
    
    this.levelTimer.start();
    this.countDownTimer.start();
  }, // create
  
  update: function() {
  }, // update
  
  render: function() {
     // --== display debug info ==--
    this.game.debug.text('debug: ' + this.mouseInputs + ' frame: ' + this.face.frame + ' slaps: ' + this.slapCount, 16, 16);
    this.game.debug.text('timer: ' + this.levelTimer.duration.toFixed(0) + ' level: ' + this.levelCount, 16, 32 );
    this.game.debug.text('gameplay: ' + this.gamePlayActive + ' count down: ' + this.countDownActive, 16, 64);
    this.game.debug.text('count down timer: ' + this.countDownTimer.duration.toFixed(0), 16, 80);    
  }, // render
  
  // --== my functions ==--  
  faceTouched: function(sprite) {
    if (this.gamePlayActive) { // check if game play is active
      this.mouseInputs++; // count the number of inputs
      this.slapCount++;    

      if (this.face.frame == 0) { // check if the face is displaying the happy frame
        this.slapCount = 0;
        this.face.frame = game.rnd.integerInRange(1, 4); // randomly set the frame from neutral to angry

        this.face.x = game.world.randomX; // randomly position face along X within the game world
        this.face.y = game.world.randomY; // randomly position face along Y within the game world

        this.face.angle = game.rnd.angle(); // randomly set the angle of the face   
      } else if (this.slapCount == (this.face.frame + 1)) { // if the face isn't happy change it on input      
        this.face.frame--; // change to the pervious face
        this.slapCount = 0;
      }
    }
  },
  
  startIntermission: function() {
    this.levelTimer.pause();
    
    this.levelCount++;
    
    this.gamePlayActive = false;
    this.countDownActive = true;
    
    this.countDownTimer.resume();
  },
  
  startGamePlay: function() {
    this.countDownTimer.pause();
    
    this.gamePlayActive = true;
    this.countDownActive = false;
    
    this.levelTimer.resume();
  },  
  
  // --== end of my functions ==--
}; // mainState

game.state.add('main', mainState); // add the 'main' state
game.state.start('main'); // start the 'main' state