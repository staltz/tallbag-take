const makeShadow = require('shadow-callbag').default;

const take = max => source => (start, sink) => {
  if (start !== 0) return;
  let taken = 0;
  let shadow;
  let sourceTalkback;
  function talkback(t, d) {
    if (taken < max) sourceTalkback(t, d);
  }
  source(0, (t, d, s) => {
    if (t === 0) {
      shadow = makeShadow('take', s);
      sourceTalkback = d;
      sink(0, talkback, shadow);
    } else if (t === 1) {
      if (taken < max) {
        taken++;
        shadow(t, d);
        sink(t, d);
        if (taken === max) {
          sink(2);
          sourceTalkback(2);
        }
      }
    } else {
      sink(t, d);
    }
  });
};

module.exports = take;
