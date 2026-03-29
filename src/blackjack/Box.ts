import { Box } from "/common";
import { Card } from "/blackjack";

class BJBox extends Box {
	get total() {
		const individualScores = this.content.map((card: Card) => card.value);
		const rawTotal = individualScores.reduce((a, b) => a + b, 0);

		if (rawTotal < 12 && (this.content as Card[]).find((card) => card.rank === "A")) {
			return rawTotal + 10;
		}

		return rawTotal;
	}

	get isBlackjack() {
		return this.total === 21 && this.size === 2;
	}

	constructor(name: string) {
		super(name);
	}
}

export { BJBox as Box };
