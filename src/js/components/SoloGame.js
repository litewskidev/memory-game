import { templates, select, classNames } from '../settings.js';

class SoloGame {
  constructor(element, theme, players, grid, domElements, domActions) {
    const thisSoloGame = this;

    thisSoloGame.element = element;
    thisSoloGame.theme = theme;
    thisSoloGame.players = players;
    thisSoloGame.grid = grid;
    thisSoloGame.domElements = domElements;
    thisSoloGame.domActions = domActions;

    thisSoloGame.render();
  }

  memoryGrid() {
    const thisSoloGame = this;

    const gridContainer = document.querySelector('#grid-container');
    const endGameModal = document.querySelector(select.modalOf.endGame);
    const endGameMoves = document.querySelector('.end__game__moves');
    const endGameTime = document.querySelector('.end__game__time');

    let firstCard = false;
    let firstCardValue;
    let secondCard = false;
    let secondCardValue;
    let moves = 0;
    let matchedCount = 0;
    let mins = 0;
    let secs = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let paused = true;
    let intervalId;
    let themeArray;

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

    const time = (click) => {
      const thisSoloGame = this;
      if(click === 1) {
        if(paused) {
          paused = false;
          startTime = Date.now() - elapsedTime;
          intervalId = setInterval(updateTime);
        }
      }

      thisSoloGame.timePauseBtn.addEventListener('click', () => {
        if(!paused) {
          paused = true;
          startTime = Date.now() - startTime;
          clearInterval(intervalId);
        }
      });

      thisSoloGame.timeResumeBtn.addEventListener('click', () => {
        if(paused && startTime != 0) {
          paused = false;
          startTime = Date.now() - elapsedTime;
          intervalId = setInterval(updateTime);
        }
      });

      function updateTime() {
        elapsedTime = Date.now() - startTime;
        secs = Math.floor((elapsedTime / 1000) % 60);
        mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
        secs = format(secs);

        thisSoloGame.timeDisplay.innerHTML = `${mins}:${secs}`;

        function format(unit) {
          return (('0') + unit).length > 2 ? unit : '0' + unit;
        }
      }
    };

    const playerMoves = () => {
      const thisSoloGame = this;
      moves += 1;
      thisSoloGame.movesDisplay.innerHTML = moves;
    };

    const generateRandom = (size) => {

      if(thisSoloGame.theme === 'icons') {
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
      let clicked = 0;

      // GRID
      gridContainer.innerHTML = '';
      cardValues = [...cardValues, ...cardValues];
      cardValues.sort(() => Math.random() - 0.7);
      if(thisSoloGame.grid === '4x4'){
        if(thisSoloGame.theme === 'icons') {
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
        if(thisSoloGame.theme === 'icons') {
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
      thisSoloGame.cards = document.querySelectorAll(['.card__container', '.card__container__6x6']);
      thisSoloGame.cards.forEach(card => {
        card.addEventListener('click', () => {
          clicked ++;
          time(clicked);
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
                playerMoves();
                secondCard = card;
                secondCardValue = card.getAttribute('data-card-value');
                if(firstCardValue == secondCardValue) {
                  firstCard.classList.add('matched');
                  secondCard.classList.add('matched');
                  firstCard = false;
                  matchedCount += 1;
                  checkCards = [];
                  if(matchedCount == Math.floor(cardValues.length / 2)) {
                    paused = true;
                    startTime = Date.now() - startTime;
                    clearInterval(intervalId);
                    setTimeout(() => {
                      endGameModal.classList.add(classNames.active);
                      endGameTime.innerHTML = `${mins}:${secs}`;
                      endGameMoves.innerHTML = moves;
                    }, 200);
                  }
                } else {
                  let [tempFirst, tempSecond] = [firstCard, secondCard];
                  firstCard = false;
                  secondCard = false;
                  setTimeout(() => {
                    tempFirst.classList.remove('flipped');
                    tempSecond.classList.remove('flipped');
                  }, 750);
                  setTimeout(() => {
                    checkCards = [];
                  }, 750);
                }
              }
            }
          }
        });
      });
    };

    const restartGame = () => {
      thisSoloGame.gameRestart.addEventListener('click', e => {
        e.preventDefault();
        paused = true;
        clearInterval(intervalId);
        startTime = 0;
        elapsedTime = 0;
        mins = 0;
        secs = 0;
        thisSoloGame.timeDisplay.innerHTML = `0:00`;
        this.render();
      });
    };

    const init = () => {
      if(thisSoloGame.grid === '4x4'){
        let cardValues = generateRandom(4);
        generateGrid(cardValues, 4);
      } else {
        let cardValues = generateRandom(6);
        generateGrid(cardValues, 6);
      }

      restartGame();
    };

    init();
  }

  getElementsSolo() {
    const thisSoloGame = this;

    thisSoloGame.timeDisplay = thisSoloGame.element.querySelector(select.timeDisplay);
    thisSoloGame.movesDisplay = thisSoloGame.element.querySelector(select.movesDisplay);
    thisSoloGame.timePauseBtn = thisSoloGame.element.querySelector(select.button.menuButton);
    thisSoloGame.timeResumeBtn = thisSoloGame.element.querySelector(select.button.menuResume);
    thisSoloGame.gameRestart = thisSoloGame.element.querySelector(select.button.gameRestart);
  }

  render() {
    const thisSoloGame = this;

    const generatedHTML = templates.soloGameWidget();
    thisSoloGame.dom = {};
    thisSoloGame.dom.wrapper = thisSoloGame.element;
    thisSoloGame.element.innerHTML = generatedHTML;
    thisSoloGame.domElements();
    thisSoloGame.domActions();
    thisSoloGame.getElementsSolo();
    thisSoloGame.memoryGrid();
  }
}

export default SoloGame;
