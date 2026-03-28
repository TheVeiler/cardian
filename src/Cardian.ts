import * as common from "./common/index";
import * as decklists from "./decklists/index";
// import * as blackjack from "./blackjack/index";
// import * as holdem from "./holdem/index";

type Card = typeof common.Card; //| typeof blackjack.Card | holdem.Card;
type Box = typeof common.Box; //| typeof blackjack.Box | holdem.Box;
type List = typeof common.List; //| typeof blackjack.List | holdem.List;

type Mode = "none" | "blackjack";

class Cardian {
	#Card: Card;
	get Card() {
		return this.#Card;
	}
	#Box: Box;
	get Box() {
		return this.#Box;
	}
	#List: List;
	get List() {
		return this.#List;
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
		this.#Card = common.Card;
		this.#Box = common.Box;
		this.#List = common.List;

		this.#standard52 = decklists.standard52;
		this.#standard52_sextet = decklists.standard52_sextet;
	}

	setMode(mode: Mode = "none"): void {
		switch (mode) {
			case "none":
				this.#Card = common.Card;
				this.#Box = common.Box;
				this.#List = common.List;
				break;

			// case "blackjack":
			// 	this.#Card = blackjack.Card;
			// 	this.#Box = blackjack.Box;
			// 	this.#List = blackjack.List;
			// 	break;

			// case "holdem":
			// 	this.#Card = holdem.Card;
			// 	this.#Box = holdem.Box;
			// 	this.#List = holdem.List;
			// 	break;
		}
	}
}

const cardian = new Cardian();

export default cardian;
