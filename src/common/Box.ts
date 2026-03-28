import { Card } from "/common";

type Position = "top" | "bottom";

/**
 * A Box is an ordered pile of Cards that can be used to represent hands, boards, and discard piles.
 * @constructor
 * @param {string} name - The name of the Box; Be careful when using names as identifiers as they are not required to be unique
 */
export class Box {
	/**
	 * All the currently existing Boxes.
	 * @type {Array<Box>}
	 * @private
	 */
	static #list: Array<Box> = [];

	/**
	 * Gets all the currently existing Boxes.
	 * @returns All the currently existing Boxes
	 * @public
	 */
	static all() {
		return Box.#list;
	}

	/**
	 * Gets a Box by its name.
	 * @param {string} name - The name of the Box; Be careful when using names as identifiers as they are not required to be unique
	 * @returns The Box instance, or undefined if name didn't match
	 * @public
	 */
	static getByName(name: string): Box | undefined {
		return Box.#list.find((box) => box.name === name);
	}

	/**
	 * Adds a new Box to the list of existing ones.
	 * @param {Box} box - The Box to add
	 * @private
	 */
	static #add(box: Box) {
		Box.#list.push(box);
	}

	#name: string;
	/**
	 * The name of a Box. Be careful when using names as identifiers as they are not required to be unique
	 * @type {string}
	 * @readonly
	 */
	get name() {
		return this.#name;
	}

	#content: Array<Card> = [];
	/**
	 * All the Cards stored in a Box.
	 * @type {Array<Card>}
	 * @readonly
	 */
	get content() {
		return this.#content;
	}

	/**
	 * The number of Cards stored in a Box.
	 * @type {number}
	 * @readonly
	 */
	get size() {
		return this.content.length;
	}

	/**
	 * The Card stored at the beginning of a Box.
	 * @type {Card}
	 * @readonly
	 */
	get top() {
		return this.content[0];
	}

	/**
	 * The Card stored at the end of a Box.
	 * @type {Card}
	 * @readonly
	 */
	get bottom() {
		return this.content.at(-1);
	}

	/**
	 * Adds Cards to a Box.
	 * @param {Array<Cards>} cards - The Cards to add to the Box
	 * @returns The updated Box
	 * @public
	 */
	addCards(...cards: Array<Card>): Box;
	/**
	 * Adds Cards to a Box, at given position.
	 * @param {"top" | "bottom"} position - The position at which to insert the Cards (default: "bottom")
	 * @param {Array<Cards>} cards - The Cards to add
	 * @returns The updated Box
	 * @public
	 */
	addCards(position: Position, ...cards: Array<Card>): Box;
	addCards(positionOrfirstCard: Card | Position = "bottom", ...cards: Array<Card>): Box {
		let position: "bottom" | "top";

		if (positionOrfirstCard instanceof Card) {
			position = "bottom";
			cards.unshift(positionOrfirstCard);
		} else {
			position = positionOrfirstCard;
		}

		const index = position === "top" ? 0 : this.size;

		this.#content.splice(index, 0, ...cards);

		return this;
	}

	/**
	 * Removes Cards from a Box by returning them to their default location.
	 * @param {Array<Cards>} cards - The Cards to remove
	 * @returns The updated Box
	 * @public
	 */
	removeCards(...cards: Array<Card>): Box {
		cards = cards.filter((card) => card.location === undefined);

		for (const card of cards) {
			const index = this.content.findIndex((boxCard) => boxCard.id === card.id);

			if (index > -1) {
				this.#content.splice(index, 1);
			}
		}

		return this;
	}

	/**
	 * Draws Cards from a given Box. If the Box doesn't have enough Cards, a RangeError will be thrown and none of the Cards will move.
	 * @param {Box} box - The Box from which draw Cards.
	 * @param {number} number - The number of cards to draw (default: 1)
	 * @returns The updated Box
	 * @public
	 */
	drawFrom(box: Box, number: number = 1): Box {
		if (box.size < number) {
			throw new RangeError(
				`Not enough Cards to be drawn. Box's size: ${box.size}. Number wanted: ${number}`,
			);
		}

		for (let i = 0; i < number; i++) {
			box.top.moveTo(this);
		}

		return this;
	}

	/**
	 * Empties a Box by returning each of the cards previously stored in it to their default locations.
	 * @returns The updated Box
	 * @public
	 */
	empty(): Box {
		for (const card of this.#content) {
			card.return();
		}

		return this;
	}

	/**
	 * Shuffles the content of a Box.
	 * @returns The updated Box
	 * @public
	 */
	shuffle(): Box {
		const initialContent = this.#content.splice(0);

		while (initialContent.length > 0) {
			const randomIndex = Math.floor(Math.random() * initialContent.length);

			this.addCards(...initialContent.splice(randomIndex, 1));
		}

		return this;
	}

	constructor(name: string) {
		this.#name = name;

		Box.#add(this);
	}

	get [Symbol.toStringTag]() {
		return this.name;
	}
}
