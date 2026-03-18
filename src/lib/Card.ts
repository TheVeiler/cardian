import { Decklist, CardStorage } from "./";

type Position = "top" | "bottom";

export interface PseudoCard {
	name?: string;
	copies?: number;
	assets?: {
		front?: URL;
		back?: URL;
	};
}

/**
 * The core element of this library. It represents a real world card.
 * @constructor
 * @param {Decklist} decklist - The Decklist the Card is part of
 * @param {PseudoCard} pseudoCard - The blueprint of the Card
 */
export class Card {
	/**
	 * The list of all existing Cards.
	 * @type {Array<Card>}
	 * @private
	 */
	static #list: Array<Card> = [];

	static #lastUsedId = 0;

	/**
	 * Gets a Card by its ID.
	 * @param {number} id - The ID of the Card
	 * @returns The Card or undefined if ID didn't match
	 * @public
	 */
	static getById(id: number): Card {
		return Card.#list.find((card) => card.id === id);
	}

	/**
	 * Adds a new Card to the list of existing ones.
	 * @param {Card} card - The Card to add
	 * @private
	 */
	static #add(card: Card) {
		Card.#list.push(card);
	}

	#id: number;
	/**
	 * The ID of a Card.
	 * @type {number}
	 * @readonly
	 */
	get id() {
		return this.#id;
	}

	#name: string;
	/**
	 * The name of a Card.
	 * @type {string}
	 * @readonly
	 */
	get name() {
		return this.#name;
	}

	/**
	 * The Decklist a Card comes from.
	 * @type {Decklist}
	 * @private
	 */
	#decklist: Decklist;

	#location: CardStorage | undefined;
	/**
	 * The current location of a Card.
	 * @type {CardStorage}
	 * @readonly
	 */
	get location() {
		return this.#location;
	}

	#images = {
		back: undefined,
		front: undefined,
	};
	/**
	 * The image sources of a Card.
	 * @type {Object}
	 * @readonly
	 */
	get images() {
		return this.#images;
	}

	#onMoveStart = undefined;
	get onMoveStart() {
		return this.#onMoveStart;
	}
	set onMoveStart(callback: (origin?: CardStorage, destination?: CardStorage) => void) {
		if (["function", "undefined"].includes(typeof callback)) {
			this.#onMoveStart = callback;
			return;
		}

		this.#onMoveStart = undefined;
		throw new TypeError(
			`Card.onMoveStart must be a function or undefined. Received: ${typeof callback}`,
		);
	}
	#onMoveEnd = undefined;
	get onMoveEnd() {
		return this.#onMoveEnd;
	}
	set onMoveEnd(callback: (origin?: CardStorage, destination?: CardStorage) => void) {
		if (["function", "undefined"].includes(typeof callback)) {
			this.#onMoveEnd = callback;
			return;
		}

		this.#onMoveEnd = undefined;
	}

	constructor(deckList: Decklist, pseudoCard: PseudoCard) {
		this.#name = pseudoCard.name;

		this.#decklist = deckList;
		deckList.defaultStorage.addCards(this);
		this.#location = deckList.defaultStorage;

		this.#images.front = pseudoCard.assets?.front ?? "";
		this.#images.back = pseudoCard.assets?.back ?? "";

		this.#id = Card.#lastUsedId++;
		Card.#add(this);
	}

	/**
	 * Moves a Card to the given CardStorage.
	 * @param {CardStorage} destination - The CardStorage the Card moves to
	 * @returns The updated Card
	 * @public
	 */
	moveTo(destination: CardStorage, position: Position = "bottom"): Card {
		const origin = this.location;

		if (typeof this.onMoveStart === "function") {
			this.onMoveStart(origin, destination);
		}

		this.#location = undefined; // This *must* be temporary.
		origin.removeCards(this);

		destination.addCards(position, this);
		this.#location = destination;

		if (typeof this.onMoveEnd === "function") {
			this.onMoveEnd(origin, destination);
		}

		return this;
	}

	/**
	 * Returns a Card to its default CardStorage.
	 * @returns The updated Card
	 * @public
	 */
	return(): Card {
		const _onMoveStart = this.onMoveStart;
		const _onMoveEnd = this.onMoveEnd;

		this.onMoveStart = undefined;
		this.onMoveEnd = undefined;

		this.moveTo(this.#decklist.defaultStorage);

		this.onMoveStart = _onMoveStart;
		this.onMoveEnd = _onMoveEnd;

		return this;
	}

	/**
	 * Returns a string representation of an object.
	 */
	toString(): string {
		return this.name;
	}
}
