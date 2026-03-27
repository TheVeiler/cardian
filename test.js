import * as Cardian from "./dist/index.js";

const cardlist = new Cardian.List(Cardian.standard52);
const deck = cardlist.mainBox;

const hand = new Cardian.Box("hand");

console.log(deck, hand);
