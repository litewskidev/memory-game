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
    thisStartGame.dom.numbersBtn = element.querySelector(select.start.numbers);
    thisStartGame.dom.iconsBtn = element.querySelector(select.start.icons);
    thisStartGame.dom.onePlayerBtn = element.querySelector(select.start.onePlayer);
    thisStartGame.dom.twoPlayersBtn = element.querySelector(select.start.twoPlayers);
    thisStartGame.dom.threePlayersBtn = element.querySelector(select.start.threePlayers);
    thisStartGame.dom.fourPlayersBtn = element.querySelector(select.start.fourPlayers);
    thisStartGame.dom.grid4x4Btn = element.querySelector(select.start.grid4x4);
    thisStartGame.dom.grid6x6Btn = element.querySelector(select.start.grid6x6);
    thisStartGame.dom.startGameBtn = element.querySelector(select.start.startGame);

    thisStartGame.dom.allPlayersBtn = [thisStartGame.dom.onePlayerBtn, thisStartGame.dom.twoPlayersBtn, thisStartGame.dom.threePlayersBtn, thisStartGame.dom.fourPlayersBtn];
  }

  initActionsStart() {
    const thisStartGame = this;

    thisStartGame.dom.numbersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeTheme(select.theme.numbers);
      thisStartGame.dom.numbersBtn.classList.add(classNames.activeBtn);
      thisStartGame.dom.iconsBtn.classList.remove(classNames.activeBtn);
    });

    thisStartGame.dom.iconsBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeTheme(select.theme.icons);
      thisStartGame.dom.iconsBtn.classList.add(classNames.activeBtn);
      thisStartGame.dom.numbersBtn.classList.remove(classNames.activeBtn);
    });

    thisStartGame.dom.onePlayerBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(1);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove(classNames.activeBtn);
      });
      thisStartGame.dom.onePlayerBtn.classList.add(classNames.activeBtn);
    });

    thisStartGame.dom.twoPlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(2);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove(classNames.activeBtn);
      });
      thisStartGame.dom.twoPlayersBtn.classList.add(classNames.activeBtn);
    });

    thisStartGame.dom.threePlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(3);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove(classNames.activeBtn);
      });
      thisStartGame.dom.threePlayersBtn.classList.add(classNames.activeBtn);
    });

    thisStartGame.dom.fourPlayersBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changePlayers(4);
      thisStartGame.dom.allPlayersBtn.forEach((btn) => {
        btn.classList.remove(classNames.activeBtn);
      });
      thisStartGame.dom.fourPlayersBtn.classList.add(classNames.activeBtn);
    });

    thisStartGame.dom.grid4x4Btn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeGrid(select.grid.s4x4);
      thisStartGame.dom.grid4x4Btn.classList.add(classNames.activeBtn);
      thisStartGame.dom.grid6x6Btn.classList.remove(classNames.activeBtn);
    });

    thisStartGame.dom.grid6x6Btn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.changeGrid(select.grid.s6x6);
      thisStartGame.dom.grid6x6Btn.classList.add(classNames.activeBtn);
      thisStartGame.dom.grid4x4Btn.classList.remove(classNames.activeBtn);
    });

    thisStartGame.dom.startGameBtn.addEventListener('click', e => {
      e.preventDefault();
      thisStartGame.deactivatePage(select.pages.startGame);

      if (thisStartGame.players > 1) {
        thisStartGame.initMultiGame();
        thisStartGame.activatePage(select.pages.multiGame);
      }
      else {
        this.initSoloGame();
        thisStartGame.activatePage(select.pages.soloGame);
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
        page.classList.add(classNames.active);
      }
    }
  }

  deactivatePage(pageId) {
    const thisStartGame = this;

    thisStartGame.pages = document.querySelector(select.containerOf.pages).children;

    for(let page of thisStartGame.pages) {
      if(page.id === pageId){
        page.classList.remove(classNames.active);
      }
    }
  }

  //  INIT GAME
  getElementsGame() {
    const thisGame = this;
    thisGame.dom.wrapper = thisGame.element;

    //  GAME
    thisGame.gameNewGame = thisGame.element.querySelector(select.button.gameNewGame);

    //  MENU
    thisGame.menuBtn = thisGame.element.querySelector(select.button.menuButton);
    thisGame.menuModal = thisGame.element.querySelector(select.modalOf.mobileMenu);
    thisGame.resumeBtn = thisGame.element.querySelector(select.button.menuResume);
    thisGame.restartBtn = thisGame.element.querySelector(select.button.menuRestart);
    thisGame.newGameBtn = thisGame.element.querySelector(select.button.menuNewGame);

    //  END GAME MODAL
    thisGame.newGameEndGameBtn = thisGame.element.querySelector(select.button.endGameNewGame);
    thisGame.restartEndGameBtn = thisGame.element.querySelector(select.button.endGameRestart);
    thisGame.endGameModal = thisGame.element.querySelector(select.modalOf.endGame);
  }

  initActionsGame() {
    const thisGame = this;

    //  GAME
    thisGame.gameNewGame.addEventListener('click', () => {
      window.location.reload();
    });

    //  MENU
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

    //  END GAME
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
      const player = { name:`Player ${i}`, pairs: 0 };
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
    thisStartGame.activatePage(select.pages.startGame);
  }
}

export default StartGame;
