/**
Project: SlapEm Happy
File: main.js
Date: March 25, 2015
By: Scott Henley
Description:
Simple point and click target style game. Make the unhappy targets happy before the level ends.
**/

var SlapEmHappy = SlapEmHappy || {}; // create SlapEmHappy namespace

SlapEmHappy.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv'); // start a new phaser game with the width and height set to max

SlapEmHappy.game.state.add('Boot', SlapEmHappy.Boot); // boot state
SlapEmHappy.game.state.add('Preloader', SlapEmHappy.Preloader); // preloader state
SlapEmHappy.game.state.add('MainMenu', SlapEmHappy.MainMenu); // main menu state
SlapEmHappy.game.state.add('GameLoop', SlapEmHappy.GameLoop); // game loop state
SlapEmHappy.game.state.add('Intermission', SlapEmHappy.Intermission); // intermission state
//SlapEmHappy.game.state.add('PauseMenu', SlapEmHappy.PauseMenu); // pause menu state
//SlapEmHappy.game.state.add('Credits', SlapEmHappy.Credits); // credits state

SlapEmHappy.game.state.start('Boot'); // start the boot state