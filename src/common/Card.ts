import { List, Box } from "./index";

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
 * @param {List} List - The List the Card is part of
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
	static getById(id: number): Card | undefined {
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
	 * The List a Card comes from.
	 * @type {List}
	 * @private
	 */
	#List: List;

	#location: Box;
	/**
	 * The current location of a Card.
	 * @type {Box}
	 * @readonly
	 */
	get location() {
		return this.#location;
	}

	#images: { back?: URL; front?: URL } = {
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

	#onMoveStart?: (origin?: Box, destination?: Box) => void = undefined;
	get onMoveStart() {
		return this.#onMoveStart;
	}
	set onMoveStart(callback) {
		if (["function", "undefined"].includes(typeof callback)) {
			this.#onMoveStart = callback;
			return;
		}

		this.#onMoveStart = undefined;
		throw new TypeError(
			`Card.onMoveStart must be a function or undefined. Received: ${typeof callback}`,
		);
	}
	#onMoveEnd?: (origin?: Box, destination?: Box) => void = undefined;
	get onMoveEnd() {
		return this.#onMoveEnd;
	}
	set onMoveEnd(callback) {
		if (["function", "undefined"].includes(typeof callback)) {
			this.#onMoveEnd = callback;
			return;
		}

		this.#onMoveEnd = undefined;
	}

	constructor(List: List, pseudoCard: PseudoCard) {
		this.#name = pseudoCard.name || "";

		this.#List = List;
		List.mainBox.addCards(this);
		this.#location = List.mainBox;

		this.#images.front = pseudoCard.assets?.front;
		this.#images.back = pseudoCard.assets?.back;

		this.#id = Card.#lastUsedId++;
		Card.#add(this);
	}

	/**
	 * Moves a Card to the given Box.
	 * @param {Box} destination - The Box the Card moves to
	 * @returns The updated Card
	 * @public
	 */
	moveTo(destination: Box, position: Position = "bottom"): Card {
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
	 * Returns a Card to its default Box.
	 * @returns The updated Card
	 * @public
	 */
	return(): Card {
		const _onMoveStart = this.onMoveStart;
		const _onMoveEnd = this.onMoveEnd;

		this.onMoveStart = undefined;
		this.onMoveEnd = undefined;

		this.moveTo(this.#List.mainBox);

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
