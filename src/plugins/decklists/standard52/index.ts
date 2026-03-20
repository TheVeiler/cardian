import type { PseudoCard } from "../../../lib/index";

const assetsDirectory = `file://${__dirname}/assets/standard52/`;

const ranks: Set<CardValue> = new Set([
	"A",
	"K",
	"Q",
	"J",
	"10",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
]);
const suits: Set<CardSuit> = new Set(["♦", "♠", "♥", "♣"]);

const suitInitials = {
	"♦": "d",
	"♠": "s",
	"♥": "h",
	"♣": "c",
};

/**
 * A standard 52-card deck of French-suited playing cards (Ace to King, for each of the four suits: clubs, diamonds, hearts and spades).
 */
const pseudoCards: Array<PseudoCard> = [];

for (const suit of suits) {
	for (const rank of ranks) {
		const filename = `${rank.toLowerCase()}${suitInitials[suit]}`;
		const pseudoCard = {
			name: `${rank}${suit}`,
			assets: {
				front: new URL(`${filename}.svg`, assetsDirectory),
				back: new URL("back_blue.svg", assetsDirectory),
			},
		};

		pseudoCards.push(pseudoCard);
	}
}

export default pseudoCards;

export type CardValue =
	| "A"
	| "K"
	| "Q"
	| "J"
	| "10"
	| "9"
	| "8"
	| "7"
	| "6"
	| "5"
	| "4"
	| "3"
	| "2";
export type CardSuit = "♣" | "♦" | "♥" | "♠";
export type CardName = `${CardValue}${CardSuit}`;
