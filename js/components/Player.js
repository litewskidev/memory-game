import { templates } from '../settings.js';

class Player {
  constructor(element, player) {
    const thisPlayer = this;

    thisPlayer.element = element;
    thisPlayer.player = player;
    thisPlayer.pairs = 0;

    thisPlayer.render();
  }

  render() {
    const thisPlayer = this;

    let playerData = { player: thisPlayer.player, playerMobile: thisPlayer.player.substr(7, 8), playersId: thisPlayer.player.replace(' ', '-') };

    const generatedHTML = templates.playerWidget(playerData);
    thisPlayer.dom = {};
    thisPlayer.dom.wrapper = thisPlayer.element;
    thisPlayer.element.innerHTML += generatedHTML;
  }
}

export default Player;
