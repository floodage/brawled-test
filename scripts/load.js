export let cards = [];
import { gamestate } from "./gamestate.js";

var url =
  "https://script.google.com/macros/s/AKfycbwjSmI_tuT9g_spEjwaJCwNlj5AgXrHHIp-525iN6VJFyCbXGtAf4YtiqejxZbbnmR63g/exec";
  let totalCards = 36*3; //total cards in the set
  let css = []; // css to format all off the cards
  let starter = 36*0; 
  var url = "cards.json"; 


  export function load() {
    fetch(url)
      .then((d) => d.json())
      .then((d) => {
        d[0].data.forEach((card) => {
          cards.push(card);
        });
  
        for (let i = starter; i < totalCards; i++) {
          css.push(cards[i]["css"]);
        }
        let s = document.createElement("style");
        s.innerHTML = css.join(" ");
        document.getElementsByTagName("head")[0].appendChild(s);
        console.log(
          "%c🔮Soul Database Downloaded",
          "background: teal; color: white; font-size: 1.5rem;"
        );
      });
      console.log(cards)
  }
  document.addEventListener("DOMContentLoaded", function() {
    load();
    
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loaddeck").addEventListener("click", function () {
       
       console.log(document.getElementById('deckInput'));
       const input = document.getElementById('deckInput').value;
       // Convert the input into an array of numbers
       const deckArray = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
       
       // Update gamestate.deck with the new array
       gamestate.deck = deckArray;
     
       // Log the updated gamestate for debugging purposes (optional)
       console.log(gamestate.deck);
       document.getElementById("menu").innerHTML = "";
    });
    
  })
