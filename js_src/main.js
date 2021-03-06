import 'babel-polyfill';
import ROT from 'rot-js';
import {Game} from './game.js';
import * as U from './util.js';

window.onload = function(){
  console.log("starting WSRL - window loaded")
  // Check if rot.js can work in the browser
  if(!ROT.isSupported()){
    alert("The rot.js library isn't supported by your browser.");
    return;
  }

  U.setupNoState();

  Game.init();

  // Add the containers to our HTML page
  document.getElementById('ppavatar').appendChild(Game.getDisplay('avatar').getContainer());
  document.getElementById('ppmain').appendChild(Game.getDisplay('main').getContainer());
  document.getElementById('ppmessage').appendChild(Game.getDisplay('message').getContainer());

  Game.bindEvent('keypress');
  Game.bindEvent('keydown');
  Game.bindEvent('keyup');

  Game.render();
}
