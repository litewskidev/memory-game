import { templates } from '../settings.js';

class StartGame {
  constructor(element) {
    const thisStartGame = this;

    thisStartGame.render(element);
  }

  render(element) {
    const thisStartGame = this;

    const generatedHTML = templates.startGameWidget();
    thisStartGame.dom = {};
    thisStartGame.dom.wrapper = element;
    element.innerHTML = generatedHTML;
  }
}

export default StartGame;
