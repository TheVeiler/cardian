import { Card } from ".";
type Position = "top" | "bottom";
/**
 * A CardStorage is a pile of Cards that can be used to represent hands, boards, and discard piles.
 * @constructor
 * @param {string} name - The name of the CardStorage; Be careful when using names as identifiers as they are not required to be unique
 */
export declare class CardStorage {
    #private;
    /**
     * Gets all the currently existing CardStorages.
     * @returns All the currently existing CardStorages
     * @public
     */
    static all(): CardStorage[];
    /**
     * Gets a CardStorage by its name.
     * @param {string} name - The name of the CardStorage; Be careful when using names as identifiers as they are not required to be unique
     * @returns The CardStorage instance, or undefined if name didn't match
     * @public
     */
    static getByName(name: string): CardStorage | undefined;
    /**
     * The name of a CardStorage. Be careful when using names as identifiers as they are not required to be unique
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * All the Cards stored in a CardStorage.
     * @type {Array<Card>}
     * @readonly
     */
    get content(): Card[];
    /**
     * The number of Cards stored in a CardStorage.
     * @type {number}
     * @readonly
     */
    get length(): number;
    /**
     * The Card stored at the beginning of a CardStorage.
     * @type {Card}
     * @readonly
     */
    get top(): Card;
    /**
     * The Card stored at the end of a CardStorage.
     * @type {Card}
     * @readonly
     */
    get bottom(): Card;
    constructor(name: string);
    /**
     * Adds Cards to a CardStorage.
     * @param {Array<Cards>} cards - The Cards to add to the CardStorage
     * @returns The updated CardStorage
     * @public
     */
    addCards(...cards: Array<Card>): CardStorage;
    /**
     * Adds Cards to a CardStorage, at given position.
     * @param {"top" | "bottom"} position - The position at which to insert the Cards (default: "bottom")
     * @param {Array<Cards>} cards - The Cards to add
     * @returns The updated CardStorage
     * @public
     */
    addCards(position: Position, ...cards: Array<Card>): CardStorage;
    /**
     * Removes Cards from a CardStorage by returning them to their default location.
     * @param {Array<Cards>} cards - The Cards to remove
     * @returns The updated CardStorage
     * @public
     */
    removeCards(...cards: Array<Card>): CardStorage;
    /**
     * Draws Cards from a given CardStorage. If the storage doesn't have enough Cards, a RangeError will be thrown and none of the Cards will move.
     * @param {CardStorage} storage - The CardStorage from which draw Cards.
     * @param {number} number - The number of cards to draw (default: 1)
     * @returns The updated CardStorage
     * @public
     */
    drawFrom(storage: CardStorage, number?: number): CardStorage;
    /**
     * Empties a CardStorage by returning each of the cards previously stored in it to their default locations.
     * @returns The updated CardStorage
     * @public
     */
    empty(): CardStorage;
    /**
     * Shuffles the content of a CardStorage.
     * @returns The updated CardStorage
     * @public
     */
    shuffle(): CardStorage;
}
export {};
//# sourceMappingURL=CardStorage.d.ts.map