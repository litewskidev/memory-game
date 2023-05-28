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
    soloEndGame: '#solo-end-game-modal',
    multiEndGame: '#multi-end-game-modal'
  },

  nav: {
    links: '.main__nav a'
  }
};

export const classNames = {
  active: 'active'
};

export const templates = {
  startGameWidget: Handlebars.compile(document.querySelector(select.templateOf.startGameWidget).innerHTML),
  soloGameWidget: Handlebars.compile(document.querySelector(select.templateOf.soloGameWidget).innerHTML),
  multiGameWidget: Handlebars.compile(document.querySelector(select.templateOf.multiGameWidget).innerHTML)
};
