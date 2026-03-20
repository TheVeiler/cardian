import type { PseudoCard } from "../../../lib/index";
/**
 * A standard 52-card deck of French-suited playing cards (Ace to King, for each of the four suits: clubs, diamonds, hearts and spades).
 */
declare const pseudoCards: Array<PseudoCard>;
export default pseudoCards;
export type CardValue = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
export type CardSuit = "♣" | "♦" | "♥" | "♠";
export type CardName = `${CardValue}${CardSuit}`;
//# sourceMappingURL=index.d.ts.map