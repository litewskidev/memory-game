import { templates, select } from '../settings.js';

class SoloGame {
  constructor(element, theme, players, grid, domElements, domActions) {
    const thisSoloGame = this;

    thisSoloGame.element = element;
    thisSoloGame.theme = theme;
    thisSoloGame.players = players;
    thisSoloGame.grid = grid;
    thisSoloGame.domElements = domElements;
    thisSoloGame.domActions = domActions;
    thisSoloGame.moves = 0;

    thisSoloGame.render();
  }

  getElementsSolo() {
    const thisSoloGame = this;

    thisSoloGame.timeDisplay = thisSoloGame.element.querySelector(select.timeDisplay);
    thisSoloGame.movesDisplay = thisSoloGame.element.querySelector(select.movesDisplay);
    thisSoloGame.timePauseBtn = thisSoloGame.element.querySelector(select.button.menuButton);
    thisSoloGame.timeResumeBtn = thisSoloGame.element.querySelector(select.button.menuResume);
    //  TEST
    thisSoloGame.testStartBtn = thisSoloGame.element.querySelector('#test-start');
    thisSoloGame.testMovesBtn = thisSoloGame.element.querySelector('#test-moves');
  }

  playerMoves() {
    const thisSoloGame = this;

    thisSoloGame.testMovesBtn.addEventListener('click', () => {
      thisSoloGame.moves ++;
      return thisSoloGame.movesDisplay.innerHTML = thisSoloGame.moves;
    });
  }

  time() {
    const thisSoloGame = this;

    thisSoloGame.startTime = 0;
    thisSoloGame.elapsedTime = 0;
    thisSoloGame.currentTime = 0;
    thisSoloGame.mins = 0;
    thisSoloGame.secs = 0;
    thisSoloGame.paused = true;
    thisSoloGame.intervalId;

    thisSoloGame.testStartBtn.addEventListener('click', () => {
      if(thisSoloGame.paused) {
        thisSoloGame.paused = false;
        thisSoloGame.startTime = Date.now() - thisSoloGame.elapsedTime;
        thisSoloGame.intervalId = setInterval(updateTime);
      }
    });

    thisSoloGame.timePauseBtn.addEventListener('click', () => {
      if(!thisSoloGame.paused) {
        thisSoloGame.paused = true;
        thisSoloGame.startTime = Date.now() - thisSoloGame.startTime;
        clearInterval(thisSoloGame.intervalId);
      }
    });

    thisSoloGame.timeResumeBtn.addEventListener('click', () => {
      if(thisSoloGame.paused && thisSoloGame.startTime != 0) {
        thisSoloGame.paused = false;
        thisSoloGame.startTime = Date.now() - thisSoloGame.elapsedTime;
        thisSoloGame.intervalId = setInterval(updateTime);
      }
    });

    function updateTime() {
      thisSoloGame.elapsedTime = Date.now() - thisSoloGame.startTime;
      thisSoloGame.secs = Math.floor((thisSoloGame.elapsedTime / 1000) % 60);
      thisSoloGame.mins = Math.floor((thisSoloGame.elapsedTime / (1000 * 60)) % 60);
      thisSoloGame.secs = format(thisSoloGame.secs);

      thisSoloGame.timeDisplay.innerHTML = `${thisSoloGame.mins}:${thisSoloGame.secs}`;

      function format(unit) {
        return (('0') + unit).length > 2 ? unit : '0' + unit;
      }
    }
  }

  render() {
    const thisSoloGame = this;

    const generatedHTML = templates.soloGameWidget();
    thisSoloGame.dom = {};
    thisSoloGame.dom.wrapper = thisSoloGame.element;
    thisSoloGame.element.innerHTML = generatedHTML;
    thisSoloGame.domElements();
    thisSoloGame.domActions();
    thisSoloGame.getElementsSolo();
    thisSoloGame.time();
    thisSoloGame.playerMoves();
  }
}

export default SoloGame;
