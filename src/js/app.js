import StartGame from './components/StartGame.js';
import SoloGame from './components/SoloGame.js';
import MultiGame from './components/MultiGame.js';
import { classNames, select } from './settings.js';

const app = {

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages){
      if (page.id === idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    for (let page of thisApp.pages){
      page.classList.toggle(
        classNames.active,
        page.id === pageId
      );
    }

    for (let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initStartGame: function() {
    const thisApp = this;

    const startGameContainer = document.querySelector(select.containerOf.startGame);
    thisApp.startGame = new StartGame(startGameContainer);
  },

  initSoloGame: function() {
    const thisApp = this;

    const soloGameContainer = document.querySelector(select.containerOf.soloGame);
    thisApp.soloGame = new SoloGame(soloGameContainer);
  },

  initMultiGame: function() {
    const thisApp = this;

    const multiGameContainer = document.querySelector(select.containerOf.multiGame);
    thisApp.multiGame = new MultiGame(multiGameContainer);
  },

  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initStartGame();
    thisApp.initSoloGame();
    thisApp.initMultiGame();
  }
};

app.init();
