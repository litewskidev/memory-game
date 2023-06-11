export const select ={
  pages: {
    startGame: 'start-game',
    soloGame: 'solo-game',
    multiGame: 'multi-game'
  },

  templateOf: {
    startGameWidget: '#template__start__game__widget',
    soloGameWidget: '#template__solo__game__widget',
    multiGameWidget: '#template__multi__game__widget',
    playerWidget: '#template__player__widget'
  },

  containerOf: {
    pages: '#pages',
    startGame: '.start__game__wrapper',
    soloGame: '.solo__game__wrapper',
    multiGame: '.multi__game__wrapper',
    players: '#multi-players'
  },

  modalOf: {
    endGame: ['.solo-end-game-modal-wrapper', '.multi-end-game-modal-wrapper'],
    mobileMenu: '.mobile__menu__modal'
  },

  button: {
    gameNewGame: '.game__newgame__btn',
    gameRestart: '.game__restart__btn',
    menuButton: '.game__menu__btn',
    menuResume: '#mobile-resume-btn',
    menuNewGame: '#mobile-newgame-btn',
    menuRestart: '#mobile-restart-btn',
    endGameNewGame: '.end__game__newgame__btn',
    endGameRestart: '.end__game__restart__btn'
  },

  start: {
    numbers: '#numbers-btn',
    icons: '#icons-btn',
    onePlayer: '#one-player-btn',
    twoPlayers: '#two-players-btn',
    threePlayers: '#three-players-btn',
    fourPlayers: '#four-players-btn',
    grid4x4: '#grid-4x4-btn',
    grid6x6: '#grid-6x6-btn',
    startGame: '#start-game-btn'
  },

  theme: {
    numbers: 'numbers',
    icons: 'icons'
  },

  grid: {
    s4x4: '4x4',
    s6x6: '6x6'
  },

  timeDisplay: '#time-display',

  movesDisplay: '#moves-display'
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
  multiGameWidget: Handlebars.compile(document.querySelector(select.templateOf.multiGameWidget).innerHTML),
  playerWidget: Handlebars.compile(document.querySelector(select.templateOf.playerWidget).innerHTML)
};
