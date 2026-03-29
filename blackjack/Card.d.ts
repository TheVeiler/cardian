import { Card, List, type PseudoCard } from "/common";
import type { CardValue } from "/decklists/standard52/index";
type CardScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
declare class BJCard extends Card {
    #private;
    get rank(): CardValue;
    get value(): CardScore;
    constructor(decklist: List, pseudoCard: PseudoCard);
}
export { BJCard as Card };
//# sourceMappingURL=Card.d.ts.map