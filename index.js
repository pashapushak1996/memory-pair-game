"use strict";

import pictures from './data.json' assert { type: 'json' };


const shuffleArray = (arr) => {
    const arrayCopy = JSON.parse(JSON.stringify(arr));

    return arrayCopy.sort(() => 0.5 - Math.random())
};

const shuffledArrayOne = shuffleArray(pictures);
const shuffledArrayTwo = shuffleArray(pictures);

const createCards = (array) => array.map((picture) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList = "card-container";
    cardContainer.setAttribute('data-character', picture.name);

    cardContainer.innerHTML = `
                    <div class="flipper">
                      <div class="front"></div>
                      <div class="back">
                        <img src="${ picture.image }" alt="picture">
                      </div>
                    </div>`

    return cardContainer;
});

document.querySelector('.game-box').append(...createCards(shuffledArrayOne), ...createCards(shuffledArrayTwo));

const cards = document.querySelectorAll('.card-container');

let isFlippedCard = false;
let firstCard;
let secondCard;
let count = 1;

const animation = () => {
    document.querySelector('.rick').classList.add('active');
    document.querySelector('.rick-right').classList.add('active');
    setTimeout(() => {
        document.querySelector('.rick').classList.remove('active');
        document.querySelector('.rick-right').classList.remove('active');
    }, 2000);
}

const checkPair = (firstCard, secondCard) => {
    if (secondCard.dataset['character'] === firstCard.dataset['character']) {
        firstCard.classList.add('none');
        secondCard.classList.add('none');
        animation();
    } else {
        setTimeout(() => {
            firstCard.classList.toggle('flipped');
            secondCard.classList.toggle('flipped');
        }, 1000);
    }

    isFlippedCard = false;
}

const checkBoard = () => {
    const isBoardClear = [...cards].every(card => card.classList.contains('flipped'));

    if (isBoardClear) {
        setTimeout(() => {
            document.querySelector('.popup').classList.add('visible');
        }, 1000);
    }
}

const flipCard = (card) => {
    card.classList.toggle('flipped');


    document.querySelector('.count').innerText = `Number of moves - ${ count }`;

    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = card;

        return;
    }

    secondCard = card;

    if (firstCard === secondCard) {
        card.classList.remove('flipped');

        isFlippedCard = false;

        return;
    }

    count++;

    checkPair(firstCard, secondCard);

    checkBoard();
};

cards.forEach((card) => {
    card.addEventListener('click', () => {
        flipCard(card, 'character');
    });
});
