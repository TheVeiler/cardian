const Cardian = require("cardian");

const cardlist = new Cardian.List(Cardian.standard52);
const deck = cardlist.mainBox;

console.log(deck.top.name); // should display A♦

deck.shuffle();

console.log(deck.top.name); // should display a random card

const hand = new Cardian.Box("hand");

hand.drawFrom(deck, 2);

console.log(deck.size); // should display 50
console.log(hand.size); // should display 2
