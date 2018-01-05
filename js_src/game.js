import ROT from 'rot-js';
import * as U from './util.js';
import {StartupMode, PlayMode, WinMode, LoseMode} from './ui_mode.js'

export let Game = {

    _DISPLAY_SPACING: 1.1,
    _display: {
      main: {
        w: 80,
        h: 24,
        o: null
      },
      avatar: {
        w: 20,
        h: 24,
        o: null
      },
      message: {
        w: 100,
        h: 6,
        o: null
      }
    },

    modes: {
      startup: ''
    },
    curMode: '',

    init: function(){
      this._randomSeed = 5 + Math.floor(Math.random() * 100000);
      //this._randomSeed = 76250;
      console.log("using random seed" + this._randomSeed);
      ROT.RNG.setSeed(this._randomSeed);

      this.setupDisplays();

      this.setupModes();
      this.switchMode('startup');
      console.log("game:");
      console.dir(this);

    },

    setupDisplays: function(){
      for(var display_key in this._display){
        this._display[display_key].o = new ROT.Display({
          width: this._display[display_key].w,
          height: this._display[display_key].h,
          spacing: this._DISPLAY_SPACING
        });
      }
    },

    setupModes: function(){
      this.modes.startup = new StartupMode(this);
      this.modes.play = new PlayMode(this);
      this.modes.win = new WinMode(this);
      this.modes.lose = new LoseMode(this);
    },

    switchMode: function(newModeName){
      if (this.curMode) {
        this.curMode.exit();
      }
      this.curMode = this.modes[newModeName];
      if (this.curMode){
        this.curMode.enter();
      }
    },

    getDisplay: function(displayId){
      if(this._display.hasOwnProperty(displayId)){
        return this._display[displayId].o;
      }
      return null;
    },

    render: function(){
      this.renderDisplayAvatar();
      this.renderDisplayMain();
      this.renderDisplayMessage();
    },

    renderDisplayAvatar: function(){
      let d = this._display.avatar.o;
      d.clear();
      if(this.curMode===null || this.curMode==''){
        return;
      }
      else{
        this.curMode.renderAvatar(d);
      }
    },

    renderDisplayMain: function(){
      let d = this._display.main.o;
      d.clear();
      if(this.curMode===null || this.curMode==''){
        return;
      }
      else{
        this.curMode.renderMain(d);
      }
    },

    renderDisplayMessage: function(){
      // let d = this._display.message.o;
      // d.clear();
      // if(this.curMode===null || this.curMode==''){
      //   return;
      // }
      // else{
      //   this.curMode.renderMessage(d);
      // }
    },

    bindEvent: function(eventType) {
      window.addEventListener(eventType, (evt) => {
        this.eventHandler(eventType, evt);
      });
    },

    eventHandler: function (eventType, evt){
      if (this.curMode !== null && this.curMode != ''){
        if(this.curMode.handleInput(eventType, evt)){
          this.render();
          //Message.ageMessages();
        }
      }
    }
};
