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

    thisMultiGame.render();
  }

  renderPlayers() {
    const thisMultiGame = this;

    const playersContainer = document.querySelector(select.containerOf.players);
    const playersList = thisMultiGame.playersArray(thisMultiGame.players);
    thisMultiGame.playersDom = playersList.map(player => new Player(playersContainer, player));
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
  }
}

export default MultiGame;
