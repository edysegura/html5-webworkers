self.onmessage = event => {
  let ops = event.data
  let result = 0

  while (ops--) {
    result += Math.random()
  }

  self.postMessage(result)
}
