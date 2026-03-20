import { CardStorage, type PseudoCard, Card } from ".";

/**
 * A Decklist is a complete collection of Cards.
 * @constructor
 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the Decklist with
 * @public
 */
export class Decklist extends Array<Card> {
	#defaultStorage: CardStorage;
	/**
	 * The default location of all of a Decklist's Cards.
	 * @type {CardStorage}
	 * @public
	 */
	get defaultStorage() {
		return this.#defaultStorage;
	}
	set defaultStorage(storage: CardStorage) {
		for (const card of this) {
			card.moveTo(storage);
		}

		this.#defaultStorage = storage;
	}

	constructor(pseudoCards: Array<PseudoCard>) {
		super();

		this.#defaultStorage = new CardStorage("deck");

		this.add(...pseudoCards);
	}

	/**
	 * Adds Cards to a Decklist using blueprints.
	 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the Decklist with
	 * @returns The updated Decklist
	 * @public
	 */
	add(...pseudoCards: Array<PseudoCard>): Decklist {
		for (const pseudoCard of pseudoCards) {
			if (pseudoCard.copies === undefined) {
				pseudoCard.copies = 1;
			}

			for (let i = 0; i < pseudoCard.copies; i++) {
				const card = new Card(this, pseudoCard);

				this.push(card);
			}
		}

		return this;
	}

	/**
	 * Returns every Cards of a Decklist to their default CardStorage.
	 * @returns The updated Decklist
	 * @public
	 */
	reset(): Decklist {
		for (const card of this) {
			//card.moveTo(this.#defaultStorage);
			card.return();
		}

		return this;
	}

	/**
	 * Checks and fixes a Decklist's Cards' locations
	 * @returns The updated Decklist
	 * @public
	 */
	fixLocations(): Decklist {
		const wronglyLocatedCards = this.filter((card) => card.location === undefined);

		for (const card of wronglyLocatedCards) {
			console.log(
				`${card.name} had undefined location; moved it to its decklist's default storage.`,
			);
			//card.moveTo(this.#defaultStorage);
			card.return();
		}

		return this;
	}
}
