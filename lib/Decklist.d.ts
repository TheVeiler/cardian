import { CardStorage, type PseudoCard, Card } from ".";
/**
 * A Decklist is a complete collection of Cards.
 * @constructor
 * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the Decklist with
 * @public
 */
export declare class Decklist extends Array<Card> {
    #private;
    /**
     * The default location of all of a Decklist's Cards.
     * @type {CardStorage}
     * @public
     */
    get defaultStorage(): CardStorage;
    set defaultStorage(storage: CardStorage);
    constructor(pseudoCards: Array<PseudoCard>);
    /**
     * Adds Cards to a Decklist using blueprints.
     * @param {Array<PseudoCard>} pseudoCards - All the Cards' blueprints to populate the Decklist with
     * @returns The updated Decklist
     * @public
     */
    add(...pseudoCards: Array<PseudoCard>): Decklist;
    /**
     * Returns every Cards of a Decklist to their default CardStorage.
     * @returns The updated Decklist
     * @public
     */
    reset(): Decklist;
    /**
     * Checks and fixes a Decklist's Cards' locations
     * @returns The updated Decklist
     * @public
     */
    fixLocations(): Decklist;
}
//# sourceMappingURL=Decklist.d.ts.map