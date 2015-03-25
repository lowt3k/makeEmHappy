/**
Project: Make Em Happy
Date: Friday March 13, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends
**/
/*
var game = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv'); // initialize Phaser and create a 960w x 640h game area

var mainState = { // create the 'main' state, contains the game  
  preload: function() {
    // --== User Interface assets ==--
    
    // --== Game Play assets ==--
    game.load.spritesheet('targets', 'assets/game_play/faces_sheet.png', 256, 256, 5); // load a sprite sheet with all five targets
  }, // preload
  
  create: function() {
    game.stage.backgroundColor = '#DADADA'; // set the background colour to a off white colour
    
    this.mouseInputs = 0; // total number of inputs received
    this.slapCount = 0; // current number of slaps the current target has received
    this.levelCount = 0; // current number of levels passed
    this.gamePlayActive = true; // check if game play is currently active
    this.countDownActive = false; // check if the count down timer is currently active
    this.totalTargets = 0;
    
    this.levelTimer = game.time.create(false); // create a game play timer for the levels   
    this.levelTimer.loop(Phaser.Timer.SECOND * 10, this.startIntermission, this); // set duration to 30 seconds and call the intermission    
    
    this.countDownTimer = game.time.create(false); // timer for the count down
    this.countDownTimer.loop(Phaser.Timer.SECOND * 4, this.startGamePlay, this); // duration 4 seconds and call game play
    
    this.addTarget();
    
    this.levelTimer.start(); // start the level timer
    this.countDownTimer.start(); // start the count down timer 3.. 2.. 1.. Go
  }, // create
  
  update: function() {
    this.target.events.onInputOver.add(this.targetTouched, this); // listen for input on the sprite
    
    this.game.debug.text('Update', 16, 144); // in update
    
    if(this.totalTargets < this.levelCount) {
      this.addTarget();
    }    
  }, // update
  
  render: function() {
     // --== display debug info ==--
    this.game.debug.text('debug: ' + this.mouseInputs + ' frame: ' + this.target.frame + ' slaps: ' + this.slapCount, 16, 16); // input counts
    this.game.debug.text('timer: ' + this.levelTimer.duration.toFixed(0) + ' level: ' + this.levelCount, 16, 32 ); // timer and level count
    this.game.debug.text('gameplay: ' + this.gamePlayActive + ' count down: ' + this.countDownActive, 16, 64); // current state - gameplay or countdown
    this.game.debug.text('count down timer: ' + this.countDownTimer.duration.toFixed(0), 16, 80); // count down timer count
    this.game.debug.text('total targets: ' + this.totalTargets, 16, 112); // total target count
  }, // render
  
  // --== my functions ==--  
  addTarget: function() { // create sprite targets
    this.target = game.add.sprite(game.world.randomX, game.world.randomY, 'targets'); // assign happy target to a variable
    
    this.target.frame = game.rnd.integerInRange(1, 4); // randomly pick a frame from neutral to angry 
    
    this.target.anchor.set(0.5); // move pivot point (anchor) to the centre of the sprite
    this.target.scale.set(0.5); // scale sprite down
    
    this.target.inputEnabled = true; // allow input on sprite
    this.target.input.pixelPerfectOver = true; //ignore the transparent area around the image
    //this.target.events.onInputOver.add(this.targetTouched, this); // listen for input on the sprite
    
    this.totalTargets++; // counts how many targets there currently is
  },
  
  targetTouched: function(sprite) { // handle input on the targets
    if (this.gamePlayActive) { // check if game play is active
      this.mouseInputs++; // count the number of inputs
      this.slapCount++; // number of times each target frame has been hit    

      if (this.target.frame == 0) { // check if the target is displaying the happy frame
        this.slapCount = 0;
        this.target.frame = game.rnd.integerInRange(1, 4); // randomly set the frame from neutral to angry

        this.target.x = game.world.randomX; // randomly position target along X within the game world
        this.target.y = game.world.randomY; // randomly position target along Y within the game world

        this.target.angle = game.rnd.angle(); // randomly set the angle of the target   
      } else if (this.slapCount == (this.target.frame + 1)) { // if the target isn't happy change it on input      
        this.target.frame--; // change to the pervious target
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
*/