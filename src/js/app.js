import StartGame from './components/StartGame.js';
import { select } from './settings.js';

const app = {

  initGame: function() {
    const thisApp = this;

    const startGameContainer = document.querySelector(select.containerOf.startGame);
    thisApp.startGame = new StartGame(startGameContainer);
  },

  init: function() {
    const thisApp = this;

    thisApp.initGame();
  }
};

app.init();
