import { Box, Card, type PseudoCard } from "./index";

/**
 * A List is a complete collection of Cards.
 * @constructor
 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the List with
 * @public
 */
export class List extends Array<Card> {
	#mainBox: Box;
	/**
	 * The default location of all of a List's Cards.
	 * @type {Box}
	 * @public
	 */
	get mainBox() {
		return this.#mainBox;
	}
	set mainBox(storage: Box) {
		for (const card of this) {
			card.moveTo(storage);
		}

		this.#mainBox = storage;
	}

	/**
	 * Adds Cards to a List using blueprints.
	 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the List with
	 * @returns The updated List
	 * @public
	 */
	add(...pseudoCards: Array<PseudoCard>): List {
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
	 * Returns every Cards of a List to their default Box.
	 * @returns The updated List
	 * @public
	 */
	reset(): List {
		for (const card of this) {
			//card.moveTo(this.#mainBox);
			card.return();
		}

		return this;
	}

	/**
	 * Checks and fixes a List's Cards' locations
	 * @returns The updated List
	 * @public
	 */
	fixLocations(): List {
		const wronglyLocatedCards = this.filter((card) => card.location === undefined);

		for (const card of wronglyLocatedCards) {
			console.log(`${card.name} had undefined location; moved it to its List's default storage.`);
			//card.moveTo(this.#mainBox);
			card.return();
		}

		return this;
	}

	constructor(pseudoCards: Array<PseudoCard>) {
		super();

		this.#mainBox = new Box("DEFAULT");

		this.add(...pseudoCards);
	}
}
