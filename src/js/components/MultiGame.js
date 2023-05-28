import { templates } from '../settings.js';

class MultiGame {
  constructor(element) {
    const thisMultiGame = this;

    thisMultiGame.render(element);
  }

  render(element) {
    const thisMultiGame = this;

    const generatedHTML = templates.multiGameWidget();
    thisMultiGame.dom = {};
    thisMultiGame.dom.wrapper = element;
    element.innerHTML = generatedHTML;
  }
}

export default MultiGame;
