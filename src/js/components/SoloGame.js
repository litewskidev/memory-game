import { templates } from '../settings.js';

class SoloGame {
  constructor(element) {
    const thisSoloGame = this;

    thisSoloGame.render(element);
  }

  render(element) {
    const thisSoloGame = this;

    const generatedHTML = templates.soloGameWidget();
    thisSoloGame.dom = {};
    thisSoloGame.dom.wrapper = element;
    element.innerHTML = generatedHTML;
  }
}

export default SoloGame;
