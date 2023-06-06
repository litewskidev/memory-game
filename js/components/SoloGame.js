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

    let cards;
    let firstCard = false;
    let firstCardValue;
    let secondCard = false;
    let secondCardValue;
    let moves = 0;
    let winCount = 0;
    let playerWin = false;

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
      { name: 'ball', image: 'images/icons/volleyball-solid.svg' }
    ];

    const time = () => {
      const thisSoloGame = this;

      let startTime = 0;
      let elapsedTime = 0;
      let mins = 0;
      let secs = 0;
      let paused = true;
      let intervalId;

      if(paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime);
      }

      else if(playerWin === true) {
        paused = true;
        startTime = Date.now() - startTime;
        clearInterval(intervalId);
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

      let tempArray = [...icons];
      let cardValues = [];

      size = (size * size) / 2;

      for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
      }

      return cardValues;
    };

    const generateGrid = (cardValues, size) => {
      gridContainer.innerHTML = '';
      cardValues = [...cardValues, ...cardValues];
      cardValues.sort(() => Math.random() - 0.7);
      for(let i = 0; i < size * size; i++) {
        gridContainer.innerHTML += `
        <div class="card__container" data-card-value="${cardValues[i].name}">
          <div class="card__before"></div>
          <div clas="card__after">
            <img src="${cardValues[i].image}" class="image" />
          </div>
        </div>`;
      }

      gridContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

      thisSoloGame.cards = document.querySelectorAll('.card__container');
      console.log(cards);
      thisSoloGame.cards.forEach(card => {
        card.addEventListener('click', () => {
          if(!card.classList.contains('matched')) {
            card.classList.add('flipped');
            if(!firstCard) {
              firstCard = card;
              firstCardValue = card.getAttribute('data-card-value');
            }
            else {
              playerMoves();
              secondCard = card;
              secondCardValue = card.getAttribute('data-card-value');
              if(firstCardValue == secondCardValue) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                firstCard = false;
                winCount += 1;
                if(winCount == Math.floor(cardValues.length / 2)) {
                  playerWin = true;
                  console.log(playerWin);
                  endGameMoves.innerHTML = moves;
                  setTimeout(() => {
                    endGameModal.classList.add(classNames.active);
                  }, 500);
                }
              } else {
                let [tempFirst, tempSecond] = [firstCard, secondCard];
                firstCard = false;
                secondCard = false;
                thisSoloGame.delay = setTimeout(() => {
                  tempFirst.classList.remove('flipped');
                  tempSecond.classList.remove('flipped');
                }, 1000);
              }
            }
          }
        });
      });
    };

    const init = () => {
      let cardValues = generateRandom(4);
      generateGrid(cardValues, 4);
      time();
    };

    init();
  }

  getElementsSolo() {
    const thisSoloGame = this;

    thisSoloGame.timeDisplay = thisSoloGame.element.querySelector(select.timeDisplay);
    thisSoloGame.movesDisplay = thisSoloGame.element.querySelector(select.movesDisplay);
    thisSoloGame.timePauseBtn = thisSoloGame.element.querySelector(select.button.menuButton);
    thisSoloGame.timeResumeBtn = thisSoloGame.element.querySelector(select.button.menuResume);
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
