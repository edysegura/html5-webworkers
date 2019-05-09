export function showResults(result) {
  const output = document.getElementById('output')
  output.textContent = result ? `received: ${result}` : ''
}

export function isWorkerSelected() {
  return document.querySelector('[name=useWebWorker]').checked
}
