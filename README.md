# Cardian

## Description

**Cardian** is an utility library to help you making apps using cards.

The library gives you access to the following exported classes, and all of them are also included in the default export.

## How to use

Once the package downloaded, you could start by loading the standard52 plugin and play with that:

### as a client-side script

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script type="module">
            import Cardian from "https://theveiler.github.io/Cardian/index.js";

            const cardlist = new Cardian.Decklist(Cardian.plugins.decklists.standard52);
            const deck = cardlist.defaultStorage;

            console.log(deck.top);
        </script>
    </head>
    <body></body>
</html>
```

### as a NPM package

#### CommonJS

```js
const Cardian = require("cardian");

const cardlist = new Cardian.Decklist(Cardian.plugins.decklists.standard52);
const deck = cardlist.defaultStorage;

console.log(deck.top.name); // should display A♦

deck.shuffle();

console.log(deck.top.name); // should display a random card
```

#### ECMAScript

```js
import * as Cardian from "cardian";

const cardlist = new Cardian.Decklist(Cardian.plugins.decklists.standard52);
const deck = cardlist.defaultStorage;

console.log(deck.top.name); // should display A♦

deck.shuffle();

console.log(deck.top.name); // should display a random card
```

## To-do

- Make a proper documentation (using jsdoc or tsdoc maybe?)
- Add listener for events when CardStorage changed
- Add unit tests
