import { classNames, select, templates } from '../settings.js';

class MultiGame {
  constructor(element, theme, players, grid) {
    const thisMultiGame = this;

    thisMultiGame.theme = theme;
    thisMultiGame.players = players;
    thisMultiGame.grid = grid;

    thisMultiGame.element = element;
    thisMultiGame.render();
  }

  getElements() {
    const thisMultiGame = this;

    thisMultiGame.dom.wrapper = thisMultiGame.element;
    thisMultiGame.menuBtn = thisMultiGame.element.querySelector(select.button.menuButton);
    thisMultiGame.menuModal = thisMultiGame.element.querySelector(select.modalOf.mobileMenu);
    thisMultiGame.resumeBtn = thisMultiGame.element.querySelector(select.button.menuResume);
    thisMultiGame.restartBtn = thisMultiGame.element.querySelector(select.button.menuRestart);
    thisMultiGame.newGameBtn = thisMultiGame.element.querySelector(select.button.menuNewGame);

    thisMultiGame.testBtn = thisMultiGame.element.querySelector('#endgame-modal-test');
    thisMultiGame.restartTestBtn = thisMultiGame.element.querySelector('.end__game__newgame__btn');
    thisMultiGame.endGameModal = thisMultiGame.element.querySelector(select.modalOf.multiEndGame);
  }

  initActions() {
    const thisMultiGame = this;

    thisMultiGame.menuBtn.addEventListener('click', e => {
      e.preventDefault();
      thisMultiGame.menuModal.classList.add(classNames.activeMenu);
    });

    thisMultiGame.resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      thisMultiGame.menuModal.classList.remove(classNames.activeMenu);
    });

    thisMultiGame.restartBtn.addEventListener('click', e => {
      e.preventDefault();
      thisMultiGame.render();
    });

    thisMultiGame.newGameBtn.addEventListener('click', () => {
      window.location.reload();
    });


    //  TEST BTN
    thisMultiGame.testBtn.addEventListener('click', (e) => {
      e.preventDefault();
      thisMultiGame.menuModal.classList.remove(classNames.activeMenu);
      thisMultiGame.endGameModal.classList.add(classNames.active);
    });

    thisMultiGame.restartTestBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  render() {
    const thisMultiGame = this;

    const generatedHTML = templates.multiGameWidget();
    thisMultiGame.dom = {};
    thisMultiGame.dom.wrapper = thisMultiGame.element;
    thisMultiGame.element.innerHTML = generatedHTML;
    thisMultiGame.getElements();
    thisMultiGame.initActions();
  }
}

export default MultiGame;
