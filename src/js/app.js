import StartGame from './components/StartGame.js';
import SoloGame from './components/SoloGame.js';
import MultiGame from './components/MultiGame.js';
import { select } from './settings.js';

const app = {

  initStartGame: function() {
    const thisApp = this;

    const startGameContainer = document.querySelector(select.containerOf.startGame);
    thisApp.startGame = new StartGame(startGameContainer);
  },

  initSoloGame: function() {
    const thisApp = this;

    const soloGameContainer = document.querySelector(select.containerOf.soloGame);
    thisApp.soloGame = new SoloGame(soloGameContainer);
  },

  initMultiGame: function() {
    const thisApp = this;

    const multiGameContainer = document.querySelector(select.containerOf.multiGame);
    thisApp.multiGame = new MultiGame(multiGameContainer);
  },

  init: function() {
    const thisApp = this;

    thisApp.initStartGame();
    thisApp.initSoloGame();
    thisApp.initMultiGame();
  }
};

app.init();
