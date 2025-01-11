import { gamestate } from "./gamestate.js";
import { render } from "./render.js";
import { cards } from "./load.js";

export function renderMini(num, element) {
    var clone = document.getElementById("miniclone").cloneNode(true);
    clone.id = "";
    element.appendChild(clone);
    clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);


    const effectElement = clone.querySelector(".effect");
    if (effectElement) {
        effectElement.classList.add(cards[num]["effect"]);
    }

    if (cards[num]["type"] === "Lord") {    
            var cost = cards[num]["cost"].split("");
            for (let i = 0; i < 2; i++) {
              const soulElements = clone.querySelectorAll(".soul-block")
              soulElements.forEach((ele) => {
                ele.children[i].classList.add(cost[i]);
              });
        
            }
          
    }
}
    
    

export function renderCard(num, location, position, element) {
    renderMini(num, element);
    element.addEventListener("click", function () {
        if (gamestate.held === undefined) {
            gamestate.held = num;
            removeCard(location, position)
            event.stopPropagation();
        }

    }
    )

    element.addEventListener("mouseover", function () {

        document.getElementById("textbox-name").innerHTML = cards[num]["name"];
        document.getElementById("textbox-cardtext").innerHTML = cards[num]["cardtext"];


    })
}



function removeCard(location, position) {
    gamestate[location].splice(position, 1)
    render()
}

