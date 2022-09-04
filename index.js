const pictures = [
    {
        "id": 1,
        "name": "Rick Sanchez",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    {
        "id": 2,
        "name": "Morty Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
    },
    // {
    //     "id": 3,
    //     "name": "Summer Smith",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
    // },
    // {
    //     "id": 4,
    //     "name": "Beth Smith",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
    // },
    // {
    //     "id": 5,
    //     "name": "Jerry Smith",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg"
    // },
    // {
    //     "id": 6,
    //     "name": "Abadango Cluster Princess",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg"
    // },
    // {
    //     "id": 7,
    //     "name": "Abradolf Lincler",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg"
    // },
    // {
    //     "id": 8,
    //     "name": "Adjudicator Rick",
    //     "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg"
    // }
];

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

document.querySelector('.game-box')
    .append(...createCards(shuffledArrayOne), ...createCards(shuffledArrayTwo));

const cards = document.querySelectorAll('.card-container');
const gameBox = document.querySelector('.count');
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.popup_btn');

let isFlippedCard = false;
let firstCard;
let secondCard;
let count = 0;

const toggleCssClasses = (item, classNames) => classNames.forEach((className) => item.classList.toggle(className));

const removeCssClasses = (item, classNames) => {
    classNames.forEach((className) => {
        if (item.classList.contains(className)) {
            item.classList.remove(className);
        }
    })
};

const checkPair = (firstCard, secondCard) => {
    const firstCardDataset = firstCard.dataset['character'];
    const secondCardDataset = secondCard.dataset['character'];

    if (firstCardDataset === secondCardDataset) {
        toggleCssClasses(firstCard, ['none']);
        toggleCssClasses(secondCard, ['none']);
    } else {
        setTimeout(() => {
            toggleCssClasses(firstCard, ['flipped']);
            toggleCssClasses(secondCard, ['flipped']);
        }, 1000);
    }

    isFlippedCard = false;
}

const checkBoard = () => {
    const isBoardClear = [...cards].every(card => card.classList.contains('flipped'));

    if (isBoardClear) {
        setTimeout(() => {
            toggleCssClasses(popup, ['visible']);
        }, 1000);
    }
};

const flipCard = (card) => {
    toggleCssClasses(card, ['flipped']);

    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = card;

        return;
    }

    secondCard = card;

    if (firstCard === secondCard) {
        removeCssClasses(card, ['flipped']);

        isFlippedCard = false;

        return;
    }

    count++;

    gameBox.innerText = `Number of moves - ${ count }`;

    checkPair(firstCard, secondCard);

    checkBoard();
};

cards.forEach((card) => {
    card.addEventListener('click', () => {
        flipCard(card, 'character');
    });
});

popupButton.addEventListener('click', () =>
    cards.forEach((card) => {
        removeCssClasses(card, ['none', 'flipped']);
        removeCssClasses(popup, ['visible']);
        count = 0;
        gameBox.innerText = `Number of moves - ${ count }`;
    })
);
