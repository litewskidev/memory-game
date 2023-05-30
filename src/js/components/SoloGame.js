import { classNames, select, templates } from '../settings.js';

class SoloGame {
  constructor(element, theme, players, grid) {
    const thisSoloGame = this;

    thisSoloGame.theme = theme;
    thisSoloGame.players = players;
    thisSoloGame.grid = grid;

    thisSoloGame.element = element;
    thisSoloGame.render();
  }

  getElements() {
    const thisSoloGame = this;

    thisSoloGame.dom.wrapper = thisSoloGame.element;
    thisSoloGame.menuBtn = thisSoloGame.element.querySelector(select.button.menuButton);
    thisSoloGame.menuModal = thisSoloGame.element.querySelector(select.modalOf.mobileMenu);
    thisSoloGame.resumeBtn = thisSoloGame.element.querySelector(select.button.menuResume);
    thisSoloGame.restartBtn = thisSoloGame.element.querySelector(select.button.menuRestart);
    thisSoloGame.newGameBtn = thisSoloGame.element.querySelector(select.button.menuNewGame);

    thisSoloGame.testBtn = thisSoloGame.element.querySelector('#endgame-modal-test');
    thisSoloGame.restartTestBtn = thisSoloGame.element.querySelector('.end__game__newgame__btn');
    thisSoloGame.endGameModal = thisSoloGame.element.querySelector(select.modalOf.soloEndGame);
  }

  initActions() {
    const thisSoloGame = this;

    thisSoloGame.menuBtn.addEventListener('click', e => {
      e.preventDefault();
      thisSoloGame.menuModal.classList.add(classNames.activeMenu);
    });

    thisSoloGame.resumeBtn.addEventListener('click', e => {
      e.preventDefault();
      thisSoloGame.menuModal.classList.remove(classNames.activeMenu);
    });

    thisSoloGame.restartBtn.addEventListener('click', e => {
      e.preventDefault();
      thisSoloGame.render();
    });

    thisSoloGame.newGameBtn.addEventListener('click', () => {
      window.location.reload();
    });


    //  TEST BTN
    thisSoloGame.testBtn.addEventListener('click', (e) => {
      e.preventDefault();
      thisSoloGame.menuModal.classList.remove(classNames.activeMenu);
      thisSoloGame.endGameModal.classList.add(classNames.active);
    });

    thisSoloGame.restartTestBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  render() {
    const thisSoloGame = this;

    const generatedHTML = templates.soloGameWidget();
    thisSoloGame.dom = {};
    thisSoloGame.dom.wrapper = thisSoloGame.element;
    thisSoloGame.element.innerHTML = generatedHTML;
    thisSoloGame.getElements();
    thisSoloGame.initActions();
  }
}

export default SoloGame;
