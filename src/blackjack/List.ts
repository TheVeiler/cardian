import { List, type PseudoCard } from "/common";

class BJList extends List {
	constructor(pseudoCards: Array<PseudoCard>) {
		super(pseudoCards);
	}
}

export { BJList as List };