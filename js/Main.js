/**
Project: SlapEm Happy
File: main.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

//var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameContainer'); // start a new phaser game with the width and height set to max
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer'); // start a new phaser game with the width and height set to max

game.state.add('Boot', SlapEmHappy.Boot); // boot state
game.state.add('Preloader', SlapEmHappy.Preloader); // preloader state
game.state.add('MainMenu', SlapEmHappy.MainMenu); // main menu state
game.state.add('HowToPlay', SlapEmHappy.HowToPlay); // how to play state
game.state.add('GameLoop', SlapEmHappy.GameLoop); // game loop state
game.state.add('Intermission', SlapEmHappy.Intermission); // intermission state
//game.state.add('Credits', SlapEmHappy.Credits); // credits state

game.state.start('Boot'); // start the boot state