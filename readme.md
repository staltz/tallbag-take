# tallbag-take

Tallbag operator that limits the amount of data sent by a source. Works on either pullable and listenable sources.

`npm install tallbag-take`

## example

On a listenable source:

```js
const interval = require('callbag-interval');
const observe = require('callbag-observe');
const take = require('tallbag-take');

const source = take(3)(interval(1000));

source(0, observe(x => console.log(x))); // 0
                                         // 1
                                         // 2
```

On a pullable source:

```js
const fromIter = require('callbag-from-iter');
const iterate = require('callbag-iterate');
const take = require('tallbag-take');

function* range(from, to) {
  let i = from;
  while (i <= to) {
    yield i;
    i++;
  }
}

const source = take(4)(fromIter(range(100, 999)));

source(0, iterate(x => console.log(x))); // 100
                                         // 101
                                         // 102
                                         // 103
```
