export const select ={
  templateOf: {
    startGameWidget: '#template__start__game__widget',
    soloGameWidget: '#template__solo__game__widget',
    multiGameWidget: '#template__multi__game__widget'
  },

  containerOf: {
    pages: '#pages',
    startGame: '.start__game__wrapper',
    soloGame: '.solo__game__wrapper',
    multiGame: '.multi__game__wrapper',
  },

  modalOf: {
    soloEndGame: '.solo-end-game-modal-wrapper',
    multiEndGame: '.multi-end-game-modal-wrapper',
    mobileMenu: '.mobile__menu__modal'
  },

  button: {
    menuButton: '.game__menu__btn',
    menuResume: '#mobile-resume-btn',
    menuNewGame: '#mobile-newgame-btn',
    menuRestart: '#mobile-restart-btn'
  }
};

export const classNames = {
  active: 'active',
  activeBtn: 'activeBtn',
  activePlayer: 'active__player',
  activeTurn: 'active__turn',
  activePattern: 'active__pattern',
  activeMenu: 'on'
};

export const templates = {
  startGameWidget: Handlebars.compile(document.querySelector(select.templateOf.startGameWidget).innerHTML),
  soloGameWidget: Handlebars.compile(document.querySelector(select.templateOf.soloGameWidget).innerHTML),
  multiGameWidget: Handlebars.compile(document.querySelector(select.templateOf.multiGameWidget).innerHTML)
};
