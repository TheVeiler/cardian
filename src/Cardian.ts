import * as common from "./common/index";
import * as decklists from "./decklists/index";
// import * as blackjack from "./blackjack/index";
// import * as holdem from "./holdem/index";

interface IComponents {
	Card: Card;
	Box: Box;
	List: List;
}
type Card = typeof common.Card; // | typeof blackjack.Card; // | typeof holdem.Card;
type Box = typeof common.Box; // | typeof blackjack.Box; // | typeof holdem.Card;
type List = typeof common.List; // | typeof blackjack.List; // | typeof holdem.Card;

type Mode = "none"; // | "blackjack";

class Cardian {
	#components: IComponents;
	get Card() {
		return this.#components.Card;
	}
	get Box() {
		return this.#components.Box;
	}
	get List() {
		return this.#components.List;
	}

	#standard52: common.PseudoCard[];
	get standard52() {
		return this.#standard52;
	}
	#standard52_sextet: common.PseudoCard[];
	get standard52_sextet() {
		return this.#standard52_sextet;
	}

	constructor() {
		this.#components = common;
		console.log(this.#components);

		this.#standard52 = decklists.standard52;
		this.#standard52_sextet = decklists.standard52_sextet;
	}

	setMode(mode: Mode = "none"): void {
		switch (mode) {
			case "none":
				this.#components = common;
				break;

			// case "blackjack":
			// 	this.#components = blackjack;
			// 	break;

			// case "holdem":
			//     this.#components = holdem;
			// 	break;
		}
	}
}

const cardian = new Cardian();

export default cardian;
