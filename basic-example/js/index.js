function delegateLaborTask() {
  let isWorkerSelected = document.querySelector('[name=useWebWorker]').checked
  let operationTimes = 1000000000

  showResults()

  isWorkerSelected
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function useWebWorker(operationTimes) {
  const worker = new Worker('js/worker.js')

  worker.addEventListener('message', event => {
    showResults(event.data)
  })

  worker.postMessage(operationTimes)
}

function heavyOperation(operationTimes) {
  let result = 0
  while (operationTimes--) {
    result += Math.random()
  }
  return result
}

function useMainThread(operationTimes) {
  let result = heavyOperation(operationTimes)
  showResults(result)
}

function showResults(result) {
  const output = document.getElementById('output')
  output.textContent = result ? `received: ${result}` : ''
}

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)
