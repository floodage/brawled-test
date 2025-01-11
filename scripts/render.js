import { gamestate } from './gamestate.js';
import { renderCard } from './card.js';
import { renderMini } from './card.js';

export function render() {
    clearSearch()

    clear()

    renderDeck()
    renderDiscard()
    renderHand()
    renderBoard()
    if (gamestate.held !== undefined) {
        document.body.style.cursor = "grabbing";

    } else {
        document.body.style.cursor = "grab";

    } 
    
}

export function renderSearch(location) {

let box = document.getElementById('searchbox')
box.style.visibility = 'visible';
box.id = location;

if (location === "deck"){
    gamestate.deck.sort((a, b) => a - b);

}

for (let i = 0; i < gamestate[location].length; i++) {
        let element = document.createElement('div')
        renderCard(gamestate[location][i],location,i, element)
        box.appendChild(element)
        document.getElementById(location).appendChild(element)


}
}
function renderBoard() {
    // Iterate through each of the 4 boards (board0 to board3)
    for (let i = 0; i < 4; i++) {
        let pile = document.getElementById('board'+i);
        
        pile.onclick = function () {

            if (gamestate.held !== undefined) {
                console.log("placing")
                gamestate[`board${i}`].unshift(gamestate.held);
                gamestate.held = undefined;
                event.stopPropagation();
            } render()
        }

        pile.oncontextmenu = function (){
            event.preventDefault(); 
            if (gamestate.held !== undefined) {
                console.log("placing")
                gamestate[`board${i}`].push(gamestate.held);
                gamestate.held = undefined;
                event.stopPropagation();
            } render()
        }
        document.getElementById('board').appendChild(pile);

        let currentBoard = gamestate[`board${i}`];

        for (let j = 0; j < currentBoard.length; j++) {
            let cardId = currentBoard[j];
            let element = document.createElement('div');
            renderCard(cardId, 'board'+i, j, element);

            pile.prepend(element); 
        }
    }
}
function renderDeck() {
    document.getElementById('deck').innerHTML = gamestate.deck.length
    

}

function renderDiscard() {
    if (gamestate.discard.length != 0) {
        renderMini(gamestate.discard.at(-1),document.getElementById('discard'))
}}

function renderHand() {
    for (let i = 0; i < gamestate.hand.length; i++) {
        let element = document.createElement('div')
        
        renderCard(gamestate.hand[i],'hand',i, element)
        hand.appendChild(element)

    }
}

function clear() {
    document.getElementById('board0').innerHTML = '';
    document.getElementById('board1').innerHTML = '';
    document.getElementById('board2').innerHTML = '';
    document.getElementById('board3').innerHTML = '';
    document.getElementById('hand').innerHTML = '';
    document.getElementById('deck').innerHTML = '';
    document.getElementById('discard').innerHTML = '';
}

function clearSearch(){
    let box = document.getElementsByClassName('searchbox')
    box[0].style.visibility = 'hidden';
    box[0].id = 'searchbox';
    box[0].innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loaddeck").addEventListener("click", function () {

        render()
    });
});

export function shuffleDeck() {
    let deck = gamestate.deck;
    
    // Fisher-Yates Shuffle Algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        let j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}