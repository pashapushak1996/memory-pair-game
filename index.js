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
    }, {
        "id": 3,
        "name": "Summer Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
    }, {
        "id": 4,
        "name": "Beth Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
    }, {
        "id": 5,
        "name": "Jerry Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg"
    }, {
        "id": 6,
        "name": "Abadango Cluster Princess",
        "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg"
    }, {
        "id": 7,
        "name": "Abradolf Lincler",
        "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg"
    }, {
        "id": 8,
        "name": "Adjudicator Rick",
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg"
    }];


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

const checkPair = (firstCard, secondCard) => {
    if (secondCard.dataset['character'] === firstCard.dataset['character']) {
        firstCard.classList.add('none');
        secondCard.classList.add('none');
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
