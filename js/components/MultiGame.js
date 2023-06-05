import { select, templates } from '../settings.js';
import Player from './Player.js';

class MultiGame {
  constructor(element, theme, players, grid, domElements, domActions, playersArray) {
    const thisMultiGame = this;

    thisMultiGame.element = element;
    thisMultiGame.theme = theme;
    thisMultiGame.players = players;
    thisMultiGame.grid = grid;
    thisMultiGame.domElements = domElements;
    thisMultiGame.domActions = domActions;
    thisMultiGame.playersArray = playersArray;
    thisMultiGame.turn = 1;

    thisMultiGame.render();
  }

  changeTurn() {
    if(this.turn <= this.players){
      this.turn ++;}

    if(this.turn > this.players){
      this.turn = 1;
    }
    this.render();
  }

  getElementsPlayer() {
    const thisPlayer = this;

    thisPlayer.playerOne = document.querySelector('#Player-1');
    thisPlayer.playerTwo = document.querySelector('#Player-2');
    thisPlayer.playerThree = document.querySelector('#Player-3');
    thisPlayer.playerFour = document.querySelector('#Player-4');
  }

  initActionsPlayer() {
    const thisPlayer = this;

    if(thisPlayer.turn === 1) {
      thisPlayer.playerOne.classList.add('activeee');
    }
    if(thisPlayer.turn === 2) {
      thisPlayer.playerTwo.classList.add('activeee');
    }
    if(thisPlayer.turn === 3) {
      thisPlayer.playerThree.classList.add('activeee');
    }
    if(thisPlayer.turn === 4) {
      thisPlayer.playerFour.classList.add('activeee');
    }

    //  TEST
    thisPlayer.testTurnBtn = document.querySelector('#test-turn');
    thisPlayer.testTurnBtn.addEventListener('click', () => {
      this.changeTurn();
    });
  }

  renderPlayers() {
    const thisMultiGame = this;

    const playersContainer = document.querySelector(select.containerOf.players);
    const playersList = thisMultiGame.playersArray(thisMultiGame.players);
    thisMultiGame.playersDom = playersList.map(player => new Player(playersContainer, player));
    return this.playersDom;
  }

  render() {
    const thisMultiGame = this;

    const generatedHTML = templates.multiGameWidget();
    thisMultiGame.dom = {};
    thisMultiGame.dom.wrapper = thisMultiGame.element;
    thisMultiGame.element.innerHTML = generatedHTML;
    thisMultiGame.domElements();
    thisMultiGame.domActions();
    thisMultiGame.renderPlayers();
    thisMultiGame.getElementsPlayer();
    thisMultiGame.initActionsPlayer();
  }
}

export default MultiGame;
