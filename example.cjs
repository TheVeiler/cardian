const Cardian = require("cardian");

const cardlist = new Cardian.Decklist(Cardian.plugins.decklists.standard52);
const deck = cardlist.defaultStorage;

console.log(deck.top.name); // should display A♦

deck.shuffle();

console.log(deck.top.name); // should display a random card
