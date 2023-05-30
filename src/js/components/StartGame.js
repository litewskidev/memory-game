import SoloGame from './SoloGame.js';
import MultiGame from './MultiGame.js';
import { select, templates } from '../settings.js';

class StartGame {
  constructor(element) {
    const thisStartGame = this;

    //  INIT
    thisStartGame.theme = 'numbers';
    thisStartGame.players = 1;
    thisStartGame.grid = '4x4';

    thisStartGame.render(element);
  }

  getElements(element) {
    const thisStartGame = this;

    thisStartGame.dom.wrapper = element;
    thisStartGame.dom.numbersBtn = element.querySelector('#numbers-btn');
    thisStartGame.dom.iconsBtn = element.querySelector('#icons-btn');
    thisStartGame.dom.onePlayerBtn = element.querySelector('#one-player-btn');
    thisStartGame.dom.twoPlayersBtn = element.querySelector('#two-players-btn');
    thisStartGame.dom.threePlayersBtn = element.querySelector('#three-players-btn');
    thisStartGame.dom.fourPlayersBtn = element.querySelector('#four-players-btn');
    thisStartGame.dom.grid4x4Btn = element.querySelector('#grid-4x4-btn');
    thisStartGame.dom.grid6x6Btn = element.querySelector('#grid-6x6-btn');
    thisStartGame.dom.startGameBtn = element.querySelector('#start-game-btn');

    thisStartGame.dom.allPlayersBtn = [thisStartGame.dom.onePlayerBtn, thisStartGame.dom.twoPlayersBtn, thisStartGame.dom.threePlayersBtn, thisStartGame.dom.fourPlayersBtn];
  }

  initActions() {
    const thisStartGame = this;

    thisStartGame.dom.numbersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeTheme('numbers');
      thisStartGame.dom.numbersBtn.classList.add('activeBtn');
      thisStartGame.dom.iconsBtn.classList.remove('activeBtn');
      console.log(thisStartGame.theme);
    });

    thisStartGame.dom.iconsBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeTheme('icons');
      thisStartGame.dom.iconsBtn.classList.add('activeBtn');
      thisStartGame.dom.numbersBtn.classList.remove('activeBtn');
      console.log(thisStartGame.theme);
    });

    thisStartGame.dom.onePlayerBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(1);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove('activeBtn');
      });
      thisStartGame.dom.onePlayerBtn.classList.add('activeBtn');
      console.log(thisStartGame.players);
    });

    thisStartGame.dom.twoPlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(2);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove('activeBtn');
      });
      thisStartGame.dom.twoPlayersBtn.classList.add('activeBtn');
      console.log(thisStartGame.players);
    });

    thisStartGame.dom.threePlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(3);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove('activeBtn');
      });
      thisStartGame.dom.threePlayersBtn.classList.add('activeBtn');
      console.log(thisStartGame.players);
    });

    thisStartGame.dom.fourPlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(4);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove('activeBtn');
      });
      thisStartGame.dom.fourPlayersBtn.classList.add('activeBtn');
      console.log(thisStartGame.players);
    });

    thisStartGame.dom.grid4x4Btn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeGrid('4x4');
      thisStartGame.dom.grid4x4Btn.classList.add('activeBtn');
      thisStartGame.dom.grid6x6Btn.classList.remove('activeBtn');
      console.log(thisStartGame.grid);
    });

    thisStartGame.dom.grid6x6Btn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeGrid('6x6');
      thisStartGame.dom.grid6x6Btn.classList.add('activeBtn');
      thisStartGame.dom.grid4x4Btn.classList.remove('activeBtn');
      console.log(thisStartGame.grid);
    });

    thisStartGame.dom.startGameBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.deactivatePage('start-game');

      if (thisStartGame.players > 1) {
        thisStartGame.initMultiGame();
        thisStartGame.activatePage('multi-game');
      }
      else {
        this.initSoloGame();
        thisStartGame.activatePage('solo-game');
      }
    });
  }

  changeTheme(newTheme) {
    const thisStartGame = this;
    thisStartGame.theme = newTheme;
  }

  changePlayers(newPlayersNumber) {
    const thisStartGame = this;
    thisStartGame.players = newPlayersNumber;
  }

  changeGrid(newGridSize) {
    const thisStartGame = this;
    thisStartGame.grid = newGridSize;
  }

  activatePage(pageId) {
    const thisStartGame = this;

    thisStartGame.pages = document.querySelector(select.containerOf.pages).children;

    for(let page of thisStartGame.pages) {
      if(page.id === pageId){
        page.classList.add('active');
      }
    }
  }

  deactivatePage(pageId) {
    const thisStartGame = this;

    thisStartGame.pages = document.querySelector(select.containerOf.pages).children;

    for(let page of thisStartGame.pages) {
      if(page.id === pageId){
        page.classList.remove('active');
      }
    }
  }

  initSoloGame() {
    const thisStartGame = this;

    const soloGameContainer = document.querySelector(select.containerOf.soloGame);
    thisStartGame.soloGame = new SoloGame(soloGameContainer, thisStartGame.theme, thisStartGame.players, thisStartGame.grid);
  }

  initMultiGame() {
    const thisStartGame = this;

    const multiGameContainer = document.querySelector(select.containerOf.multiGame);
    thisStartGame.multiGame = new MultiGame(multiGameContainer, thisStartGame.theme, thisStartGame.players, thisStartGame.grid);
  }

  render(element) {
    const thisStartGame = this;

    const generatedHTML = templates.startGameWidget();
    thisStartGame.dom = {};
    thisStartGame.dom.wrapper = element;
    element.innerHTML = generatedHTML;
    thisStartGame.getElements(element);
    thisStartGame.initActions();
    thisStartGame.activatePage('start-game');
  }
}

export default StartGame;
