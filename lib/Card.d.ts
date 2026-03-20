import { Decklist, CardStorage } from ".";
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
export declare class Card {
    #private;
    /**
     * Gets a Card by its ID.
     * @param {number} id - The ID of the Card
     * @returns The Card or undefined if ID didn't match
     * @public
     */
    static getById(id: number): Card | undefined;
    /**
     * The ID of a Card.
     * @type {number}
     * @readonly
     */
    get id(): number;
    /**
     * The name of a Card.
     * @type {string}
     * @readonly
     */
    get name(): string;
    /**
     * The current location of a Card.
     * @type {CardStorage}
     * @readonly
     */
    get location(): CardStorage;
    /**
     * The image sources of a Card.
     * @type {Object}
     * @readonly
     */
    get images(): {
        back?: URL;
        front?: URL;
    };
    get onMoveStart(): (origin?: CardStorage, destination?: CardStorage) => void;
    set onMoveStart(callback: (origin?: CardStorage, destination?: CardStorage) => void);
    get onMoveEnd(): (origin?: CardStorage, destination?: CardStorage) => void;
    set onMoveEnd(callback: (origin?: CardStorage, destination?: CardStorage) => void);
    constructor(decklist: Decklist, pseudoCard: PseudoCard);
    /**
     * Moves a Card to the given CardStorage.
     * @param {CardStorage} destination - The CardStorage the Card moves to
     * @returns The updated Card
     * @public
     */
    moveTo(destination: CardStorage, position?: Position): Card;
    /**
     * Returns a Card to its default CardStorage.
     * @returns The updated Card
     * @public
     */
    return(): Card;
    /**
     * Returns a string representation of an object.
     */
    toString(): string;
}
export {};
//# sourceMappingURL=Card.d.ts.map