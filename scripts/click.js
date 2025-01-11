import { gamestate } from "./gamestate.js";
import { render } from "./render.js";
import { shuffleDeck } from "./render.js";
import { renderSearch } from "./render.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("deck").addEventListener("click", function () {
        shuffleDeck()

        if (gamestate.held === undefined) {
            gamestate.held = gamestate.deck.pop();
        } else if (gamestate.held !== undefined) {
            gamestate.deck.push(gamestate.held)
            gamestate.held = undefined;
        }
        shuffleDeck()
    
        render()
    });

    document.getElementById("deck").addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default right-click menu
        if (!document.getElementById("searchbox")) {render()}
        renderSearch("deck")

    });

    document.getElementById("discard").addEventListener("click", function () {
      
        if (gamestate.held === undefined) {
        } else if (gamestate.held !== undefined) {
            gamestate.discard.push(gamestate.held)
            gamestate.held = undefined;
            console.log(gamestate.discard)
            
            
        }
        event.stopPropagation()
        render()
    });


    document.getElementById("discard").addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default right-click menu
        if (!document.getElementById("searchbox")) {render()}
        
        renderSearch("discard")

    });

document.getElementById("hand").addEventListener("click", function (event) {
    // Check if the clicked element is the hand or a child of the hand
    if (event.target.id === "hand") {
        if (gamestate.held !== undefined) {
            gamestate.hand.push(gamestate.held);
            gamestate.held = undefined;
        }
        render();
    } 
});

});

let hoveredElement = null;

    // Add mouseover and mouseout listeners to track hovered element
    document.querySelectorAll('.boardpile').forEach((element) => {
      element.addEventListener('mouseover', () => {
        hoveredElement = element.id;
      });

      element.addEventListener('mouseout', () => {
        if (hoveredElement === element.id) {
          hoveredElement = null;
        }
      });
    });

    // Listen for the "F" key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'f' ) {
        if (hoveredElement) {
            if (document.getElementById(hoveredElement).style.justifyContent === "flex-start") {
                document.getElementById(hoveredElement).style.justifyContent = "flex-end";

            } else {
                document.getElementById(hoveredElement).style.justifyContent = "flex-start";
            }
        } 
      }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'q' ) {
          if (hoveredElement) {
            const lastDiv = Array.from(document.getElementById(hoveredElement)?.children).filter(el => el.tagName === "DIV").pop();
            lastDiv.style.transform = "rotate(-35deg)";
            console.log(lastDiv)
               } 
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'e') {
          if (hoveredElement) {
            const lastDiv = Array.from(document.getElementById(hoveredElement)?.children).filter(el => el.tagName === "DIV").pop();
            lastDiv.style.transform = "rotate(35deg)";
} 
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          if (hoveredElement) {
            const lastDiv = Array.from(document.getElementById(hoveredElement)?.children).filter(el => el.tagName === "DIV").pop();
            lastDiv.style.transform = "rotate(0deg)";
} 
        }
      });


      document.addEventListener('keydown', (event) => {
        if (event.key === '1') {
          shuffleDeck()
        gamestate.hand.push(gamestate.deck.pop());
        render();
        }
      });