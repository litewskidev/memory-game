import SoloGame from './SoloGame.js';
import MultiGame from './MultiGame.js';
import { classNames, select, templates } from '../settings.js';

class StartGame {
  constructor(element) {
    const thisStartGame = this;

    //  INIT
    thisStartGame.theme = 'numbers';
    thisStartGame.players = 1;
    thisStartGame.grid = '4x4';

    thisStartGame.render(element);
  }

  //  START
  getElementsStart(element) {
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

  initActionsStart() {
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

  //  GAME

  getElementsGame() {
    const thisGame = this;

    thisGame.dom.wrapper = thisGame.element;
    thisGame.menuBtn = thisGame.element.querySelector(select.button.menuButton);
    thisGame.menuModal = thisGame.element.querySelector(select.modalOf.mobileMenu);
    thisGame.resumeBtn = thisGame.element.querySelector(select.button.menuResume);
    thisGame.restartBtn = thisGame.element.querySelector(select.button.menuRestart);
    thisGame.newGameBtn = thisGame.element.querySelector(select.button.menuNewGame);

    thisGame.testBtn = thisGame.element.querySelector('#endgame-modal-test');
    thisGame.newGameEndGameBtn = thisGame.element.querySelector('.end__game__newgame__btn');
    thisGame.restartEndGameBtn = thisGame.element.querySelector('.end__game__restart__btn');
    thisGame.endGameModal = thisGame.element.querySelector(select.modalOf.endGame);
  }

  initActionsGame() {
    const thisGame = this;

    thisGame.menuBtn.addEventListener('click', e => {
      e.preventDefault();
      thisGame.menuModal.classList.add(classNames.activeMenu);
    });

    thisGame.resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      thisGame.menuModal.classList.remove(classNames.activeMenu);
    });

    thisGame.restartBtn.addEventListener('click', e => {
      e.preventDefault();
      thisGame.render();
    });

    thisGame.newGameBtn.addEventListener('click', () => {
      window.location.reload();
    });

    thisGame.restartEndGameBtn.addEventListener('click', e => {
      e.preventDefault();
      thisGame.render();
    });

    thisGame.newGameEndGameBtn.addEventListener('click', () => {
      window.location.reload();
    });

  }

  initSoloGame() {
    const thisStartGame = this;

    const soloGameContainer = document.querySelector(select.containerOf.soloGame);
    thisStartGame.soloGame = new SoloGame(soloGameContainer, thisStartGame.theme, thisStartGame.players, thisStartGame.grid, thisStartGame.getElementsGame, thisStartGame.initActionsGame);
  }

  initPlayers(players) {
    const allPlayers = [];
    for(let i = 1; i <= players; i++) {
      const player = `Player ${i}`;
      allPlayers.push(player);
    }
    return allPlayers;
  }

  initMultiGame() {
    const thisStartGame = this;

    const multiGameContainer = document.querySelector(select.containerOf.multiGame);
    thisStartGame.multiGame = new MultiGame(multiGameContainer, thisStartGame.theme, thisStartGame.players, thisStartGame.grid, thisStartGame.getElementsGame, thisStartGame.initActionsGame, this.initPlayers);
  }

  render(element) {
    const thisStartGame = this;

    const generatedHTML = templates.startGameWidget();
    thisStartGame.dom = {};
    thisStartGame.dom.wrapper = element;
    element.innerHTML = generatedHTML;
    thisStartGame.getElementsStart(element);
    thisStartGame.initActionsStart();
    thisStartGame.activatePage('start-game');
  }

}

export default StartGame;
