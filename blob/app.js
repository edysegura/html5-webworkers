const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)

function delegateLaborTask() {
  const isWorkerSelected = document.querySelector('[name=useWebWorker]').checked
  const operationTimes = 1000000000

  showResults()
  button.setAttribute('aria-busy', 'true')

  isWorkerSelected
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function workerScope(isMainThread) {
  function heavyOperation(operationTimes) {
    let result = 0
    while (operationTimes--) {
      result += Math.random()
    }
    return result
  }

  if (isMainThread) return heavyOperation

  const self = this
  self.addEventListener('message', (event) => {
    let result = heavyOperation(event.data)
    self.postMessage(result)
  })
}

function getWorkerAsString(worker) {
  console.log(worker.toString())
  return `( ${worker} )()`
}

function getBlobWoker() {
  const worker = getWorkerAsString(workerScope)
  const blob = new Blob([worker])
  const blobURL = URL.createObjectURL(blob, {
    type: 'application/javascript; charset=UTF-8',
  })
  return blobURL
}

function useWebWorker(operationTimes) {
  const worker = new Worker(getBlobWoker())
  worker.addEventListener('message', (event) => {
    showResults(event.data)
    worker.terminate()
  })
  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  const isMainThread = true
  const heavyOperation = workerScope(isMainThread)
  const result = heavyOperation(operationTimes)
  showResults(result)
}

function showResults(result) {
  const output = document.getElementById('output')
  output.textContent = result ? `received: ${result}` : ''
  button.removeAttribute('aria-busy')
}
