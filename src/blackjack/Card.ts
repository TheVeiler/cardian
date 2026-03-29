import { Card, List, type PseudoCard } from "/common";
import type { CardValue } from "/decklists/standard52/index";

type CardScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

class BJCard extends Card {
	#rank: CardValue;
	get rank() {
		return this.#rank;
	}

	#value: CardScore;
	get value() {
		return this.#value;
	}

	constructor(decklist: List, pseudoCard: PseudoCard) {
		super(decklist, pseudoCard);

		this.#rank = super.name.slice(0, -1) as CardValue;

		switch (this.rank) {
			case "A":
				this.#value = 1;
				break;
			case "J":
			case "Q":
			case "K":
				this.#value = 10;
				break;
			default:
				this.#value = Number(this.rank) as CardScore;
				break;
		}
	}
}

export { BJCard as Card };
