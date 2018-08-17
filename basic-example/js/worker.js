onmessage = function expensive(e) {
  var ops = e.data,
      temp = 0;

  while(ops--) {
    temp += Math.random();
  }

  postMessage(temp);
};