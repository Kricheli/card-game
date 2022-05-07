// declatration
const tableGame = document.querySelector('.grid');

const guessesGood = document.querySelector("#correct-score");

const guessesBed = document.querySelector("#incorrect-score");

const header = document.querySelector('#header')

const audio = new Audio("../audio/Assets_Audio_flip.wav")    


let totalSeconds = 0
let toStop = false;

tableGame.addEventListener('click', flipCard);
tableGame.addEventListener('click', gameCheck);
tableGame.addEventListener('click', startTimer);

export const cardArrayOptions = ['ace', 'seven', 'queen', 'prince', 'ten', 'two'];

let lastFlippedCard = null;
let guessesRight = 0;
let guessesWrong = 0;

// function to create the cards array
export function generateCards(cardArrayOptions) 
{
    const cardArray = [];
    for (let i = 0; i < cardArrayOptions.length; i++) 
    {
        cardArray.push(cardArrayOptions[i]);
        cardArray.push(cardArrayOptions[i]);
    }
    const generatedCards = shuffle(cardArray);
    return generatedCards
}
// function to randomize the cards array
export function shuffle(originalArray)
 {
    const array = [].concat(originalArray);
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) 
    {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// function to determint the card's class
export function drawCards(cards, element) 
{
    for (let card of cards) 
    {
        const cardToDraw = document.createElement('div')

        cardToDraw.setAttribute('type', card);
        cardToDraw.setAttribute('class', 'flipped-card');
        element.appendChild(cardToDraw);
    }
}

function flipCard(event)
 {
    if (event.target.getAttribute('type'))
     {
        const element = event.target;
        element.setAttribute('class', element.getAttribute('type'));
        audio.play()
    }
};
// the main function of the game
function gameCheck(event)
 {
    if (event.target.getAttribute('type')) 
    {
        // console.log('gamecheck working')
        if (lastFlippedCard === null)
         {
            lastFlippedCard = event.target;
        }
        else if (lastFlippedCard.getAttribute('class') === event.target.getAttribute('class')) 
        {
            guessesGood.innerHTML = ++guessesRight;
            lastFlippedCard = null;
            if (guessesRight === cardArrayOptions.length) 
            {
                header.innerHTML = 'You Won💪'
                toStop = true;
            }
        }
        else 
        {
            // console.log('else working')
            guessesBed.innerHTML = ++guessesWrong;
            setTimeout(function ()
             {flipAgain(lastFlippedCard, event.target)}, 1000);

            tableGame.removeEventListener('click', flipCard);
            tableGame.removeEventListener('click', gameCheck);

            setTimeout(function () 
            {tableGame.addEventListener('click', flipCard);
            tableGame.addEventListener('click', gameCheck);
            }, 1000)
        }
    }
}

function flipAgain(card1, card2) 
{
    // console.log('working again')
    card1.setAttribute('class', 'flipped-card')
    card2.setAttribute('class', 'flipped-card')
    lastFlippedCard = null
}

const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");

function setTime() 
{
    const toStopTimer = toStop;
    if (toStopTimer) 
    {
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    else 
    {
        totalSeconds++;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        setTimeout(setTime, 1000);
    }
}

function pad(val) 
{
    let valString = val + "";
    if (valString.length < 2) 
    {
        return "0" + valString;
    } else
    {
        return valString;
    }
}
export function startTimer() 
{
    totalSeconds = 0
    tableGame.removeEventListener('click', startTimer);
    setTimeout(setTime, 0);
}