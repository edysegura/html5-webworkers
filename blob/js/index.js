function delegateLaborTask() {
  let isWorkerSelected = document.querySelector('[name=useWebWorker]').checked
  let operationTimes = 1000000000

  showResults()

  isWorkerSelected
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function workerBody() {
  const self = this

  function heavyOperation(operationTimes) {
    let result = 0
    while (operationTimes--) {
      result += Math.random()
    }
    return result
  }

  self.addEventListener('message', event => {
    let result = heavyOperation(event.data)
    self.postMessage(result)
  })

  return heavyOperation
}

function getWorkerAsString() {
  return '(' + workerBody + ')()'
}

function getBlobWoker() {
  const blob = new Blob([ getWorkerAsString() ])
  const blobURL = (window.URL ? URL : webkitURL).createObjectURL(blob, {
    type: 'application/javascript; charset=UTF-8'
  })
  return blobURL
}

function useWebWorker(operationTimes) {
  const worker = new Worker(getBlobWoker())
  worker.addEventListener('message', event => {
    showResults(event.data)
  })
  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  const heavyOperation = workerBody()
  const result = heavyOperation(operationTimes)
  showResults(result)
}

function showResults(result) {
  const output = document.getElementById('output')
  output.textContent = result ? `received: ${result}` : ''
}

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)
