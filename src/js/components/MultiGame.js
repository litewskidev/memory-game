import { classNames, select, templates } from '../settings.js';
import Player from './Player.js';

class MultiGame {
  constructor(element, theme, players, grid, domElements, domActions, playersArray) {
    const thisMultiGame = this;

    thisMultiGame.element = element;
    thisMultiGame.theme = theme;
    thisMultiGame.players = players;
    thisMultiGame.grid = grid;
    thisMultiGame.domElements = domElements;
    thisMultiGame.domActions = domActions;
    thisMultiGame.playersArray = playersArray;

    thisMultiGame.render();
  }

  renderPlayers(){
    const thisMultiGame = this;

    const playersList = this.playersArray(this.players);
    const playersContainer = document.querySelector(select.containerOf.players);
    thisMultiGame.playersDom = playersList.map(player => new Player(playersContainer, player));
    return this.playersDom;
  }

  memoryGrid() {
    const thisMultiGame = this;

    //  ELEMENTS
    const playersList = this.playersArray(this.players);
    const playerOnePairs = document.querySelector('.Player-1-pairs');
    const playerTwoPairs = document.querySelector('.Player-2-pairs');
    const playerThreePairs = document.querySelector('.Player-3-pairs');
    const playerFourPairs = document.querySelector('.Player-4-pairs');

    const stPlayer = document.querySelector('#st-player');
    const ndPlayer = document.querySelector('#nd-player');
    const rdPlayer = document.querySelector('#rd-player');
    const thPlayer = document.querySelector('#th-player');

    const gridContainer = document.querySelector('#grid-container');
    const endGameModal = document.querySelector(select.modalOf.endGame);
    const endGameResults = document.querySelector('#result-winner');
    const gameRestart = document.querySelector(select.button.gameRestart);

    let firstCard = false;
    let firstCardValue;
    let secondCard = false;
    let secondCardValue;
    let matchedCount = 0;
    let themeArray;
    let turn = 1;

    const icons = [
      { name: 'anchor', image: 'images/icons/anchor-solid.svg' },
      { name: 'bug', image: 'images/icons/bug-solid.svg' },
      { name: 'car', image: 'images/icons/car-solid.svg' },
      { name: 'eye', image: 'images/icons/eye-solid.svg' },
      { name: 'flask', image: 'images/icons/flask-solid.svg' },
      { name: 'hand', image: 'images/icons/hand-spock-solid.svg' },
      { name: 'moon', image: 'images/icons/moon-regular.svg' },
      { name: 'snow', image: 'images/icons/snowflake-regular.svg' },
      { name: 'sun', image: 'images/icons/sun-solid.svg' },
      { name: 'ball', image: 'images/icons/volleyball-solid.svg' },
      { name: 'cat', image: 'images/icons/cat-solid.svg' },
      { name: 'dog', image: 'images/icons/dog-solid.svg' },
      { name: 'atom', image: 'images/icons/atom-solid.svg' },
      { name: 'fish', image: 'images/icons/fish-fins-solid.svg' },
      { name: 'frog', image: 'images/icons/frog-solid.svg' },
      { name: 'leaf', image: 'images/icons/leaf-solid.svg' },
      { name: 'paw', image: 'images/icons/paw-solid.svg' },
      { name: 'robot', image: 'images/icons/robot-solid.svg' },
      { name: 'rocket', image: 'images/icons/rocket-solid.svg' },
      { name: 'spider', image: 'images/icons/spider-solid.svg' }
    ];

    const numbers = [
      {name: 0}, {name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}, {name: 11}, {name: 12}, {name: 13}, {name: 14}, {name: 15}, {name: 16}, {name: 17}, {name: 18}, {name: 19}, {name: 20}
    ];

    const changeActivePlayer = () => {

      const playerOne = document.querySelector('#Player-1');
      const playerTwo = document.querySelector('#Player-2');
      const playerThree = document.querySelector('#Player-3');
      const playerFour = document.querySelector('#Player-4');

      if(turn === 1) {
        playerOne.classList.add('activeee');
        if(playerTwo){
          playerTwo.classList.remove('activeee');
        }
        if(playerThree) {
          playerThree.classList.remove('activeee');
        }
        if(playerFour) {
          playerFour.classList.remove('activeee');
        }
      }
      if(turn === 2) {
        playerTwo.classList.add('activeee');
        playerOne.classList.remove('activeee');
      }
      if(turn === 3) {
        playerThree.classList.add('activeee');
        playerTwo.classList.remove('activeee');
      }
      if(turn === 4) {
        playerFour.classList.add('activeee');
        playerThree.classList.remove('activeee');
      }
    };

    const changeTurn = () => {
      if(turn <= this.players){
        turn ++;}

      if(turn > this.players){
        turn = 1;
      }

      changeActivePlayer();
    };

    const generateRandom = (size) => {
      if(thisMultiGame.theme === 'icons') {
        themeArray = [...icons];
      } else {
        themeArray = [...numbers];
      }
      let cardValues = [];

      size = (size * size) / 2;

      for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * themeArray.length);
        cardValues.push(themeArray[randomIndex]);
        themeArray.splice(randomIndex, 1);
      }

      return cardValues;
    };

    const generateGrid = (cardValues, size) => {
      let checkCards = [];

      //  GRID
      gridContainer.innerHTML = '';
      cardValues = [...cardValues, ...cardValues];
      cardValues.sort(() => Math.random() - 0.7);
      if(thisMultiGame.grid === '4x4'){
        if(thisMultiGame.theme === 'icons') {
          for(let i = 0; i < size * size; i++) {
            gridContainer.innerHTML += `
            <div class="card__container" data-card-value="${cardValues[i].name}">
              <div class="card__before"></div>
              <div clas="card__after">
                <img src="${cardValues[i].image}" class="card__image" />
              </div>
            </div>`;
          }
        } else {
          for(let i = 0; i < size * size; i++) {
            gridContainer.innerHTML += `
            <div class="card__container" data-card-value="${cardValues[i].name}">
              <div class="card__before"></div>
              <div clas="card__after">
                <p class="card__number">${cardValues[i].name}</p>
              </div>
            </div>`;
          }
        }
      } else {
        if(window.matchMedia('(max-width: 540px)').matches) {
          gridContainer.style.gap = '0.57rem';
        } else {
          gridContainer.style.gap = '1rem';
        }
        if(thisMultiGame.theme === 'icons') {
          for(let i = 0; i < size * size; i++) {
            gridContainer.innerHTML += `
            <div class="card__container__6x6" data-card-value="${cardValues[i].name}">
              <div class="card__before__6x6"></div>
              <div clas="card__after__6x6">
                <img src="${cardValues[i].image}" class="card__image__6x6" />
              </div>
            </div>`;
          }
        } else {
          for(let i = 0; i < size * size; i++) {
            gridContainer.innerHTML += `
            <div class="card__container__6x6" data-card-value="${cardValues[i].name}">
              <div class="card__before__6x6"></div>
              <div clas="card__after__6x6">
                <p class="card__number__6x6">${cardValues[i].name}</p>
              </div>
            </div>`;
          }
        }
      }

      gridContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

      //  CARDS
      const cards = document.querySelectorAll(['.card__container', '.card__container__6x6']);
      cards.forEach(card => {
        card.addEventListener('click', () => {
          if(checkCards.length <= 2) {
            if(!card.classList.contains('matched')) {
              card.classList.add('flipped');
              checkCards.push(card);
              if(!firstCard) {
                firstCard = card;
                firstCardValue = card.getAttribute('data-card-value');
                checkCards.push(firstCard);
              }
              else {
                secondCard = card;
                secondCardValue = card.getAttribute('data-card-value');
                if(firstCardValue == secondCardValue) {
                  firstCard.classList.add('matched');
                  secondCard.classList.add('matched');
                  firstCard = false;
                  matchedCount += 1;
                  if(turn === 1) {
                    playersList[0].pairs += 1;
                    playerOnePairs.innerHTML = playersList[0].pairs;
                  }
                  if(turn === 2) {
                    playersList[1].pairs += 1;
                    playerTwoPairs.innerHTML = playersList[1].pairs;
                  }
                  if(turn === 3) {
                    playersList[2].pairs += 1;
                    playerThreePairs.innerHTML = playersList[2].pairs;
                  }
                  if(turn === 4) {
                    playersList[3].pairs += 1;
                    playerFourPairs.innerHTML = playersList[3].pairs;
                  }
                  setTimeout(() => {
                    changeTurn();
                    checkCards = [];
                  }, 850);

                  if(matchedCount == Math.floor(cardValues.length / 2)) {
                    setTimeout(() => {
                      endGameModal.classList.add(classNames.active);
                      playersList.sort((a, b) => b.pairs - a.pairs);
                      if(playersList[0].pairs === playersList[1].pairs || playersList[0].pairs === playersList[2].pairs || playersList[0].pairs === playersList[3].pairs) {
                        endGameResults.innerHTML = `It's a tie!`;
                      } else {
                        endGameResults.innerHTML = `${playersList[0].name} Wins!`;
                      }
                      if(playersList[0]) {
                        stPlayer.innerHTML = `
                          <div class="end__game__info winner__player">
                            <p class="st__player">${playersList[0].name} (Winner!)</p>
                            <p class="st__player__pairs">${playersList[0].pairs}</p>
                          </div>`;
                      }
                      if(playersList[1]) {
                        if(playersList[1].pairs === playersList[0].pairs) {
                          ndPlayer.innerHTML = `
                            <div class="end__game__info winner__player">
                              <p class="st__player">${playersList[1].name} (Winner!)</p>
                              <p class="st__player__pairs">${playersList[1].pairs}</p>
                            </div>`;
                        } else {
                          ndPlayer.innerHTML = `
                            <div class="end__game__info">
                              <p class="st__player">${playersList[1].name}</p>
                              <p class="st__player__pairs">${playersList[1].pairs}</p>
                            </div>`;
                        }
                      }
                      if(playersList[2]) {
                        if(playersList[2].pairs === playersList[0].pairs) {
                          rdPlayer.innerHTML = `
                            <div class="end__game__info winner__player">
                              <p class="st__player">${playersList[2].name} (Winner!)</p>
                              <p class="st__player__pairs">${playersList[2].pairs}</p>
                            </div>`;
                        } else {
                          rdPlayer.innerHTML = `
                            <div class="end__game__info">
                              <p class="st__player">${playersList[2].name}</p>
                              <p class="st__player__pairs">${playersList[2].pairs}</p>
                            </div>`;
                        }
                      }
                      if(playersList[3]) {
                        if(playersList[3].pairs === playersList[0].pairs) {
                          thPlayer.innerHTML = `
                            <div class="end__game__info winner__player">
                              <p class="st__player">${playersList[3].name} (Winner!)</p>
                              <p class="st__player__pairs">${playersList[3].pairs}</p>
                            </div>`;
                        } else {
                          thPlayer.innerHTML = `
                            <div class="end__game__info">
                              <p class="st__player">${playersList[3].name}</p>
                              <p class="st__player__pairs">${playersList[3].pairs}</p>
                            </div>`;
                        }
                      }
                      console.log(playersList);
                    }, 200);
                  }
                } else {
                  let [tempFirst, tempSecond] = [firstCard, secondCard];
                  firstCard = false;
                  secondCard = false;
                  setTimeout(() => {
                    tempFirst.classList.remove('flipped');
                    tempSecond.classList.remove('flipped');
                  }, 950);
                  setTimeout(() => {
                    changeTurn();
                    checkCards = [];
                  }, 950);
                }
              }
            }
          }
        });
      });
    };

    const restartGame = () => {
      gameRestart.addEventListener('click', e => {
        e.preventDefault();
        this.render();
      });
    };

    const init = () => {
      if(thisMultiGame.grid === '4x4'){
        let cardValues = generateRandom(4);
        generateGrid(cardValues, 4);
      } else {
        let cardValues = generateRandom(6);
        generateGrid(cardValues, 6);
      }
      changeActivePlayer();
      restartGame();
    };

    init();
  }

  render() {
    const thisMultiGame = this;

    const generatedHTML = templates.multiGameWidget();
    thisMultiGame.dom = {};
    thisMultiGame.dom.wrapper = thisMultiGame.element;
    thisMultiGame.element.innerHTML = generatedHTML;
    thisMultiGame.domElements();
    thisMultiGame.domActions();
    thisMultiGame.renderPlayers();
    thisMultiGame.memoryGrid();
  }
}

export default MultiGame;
