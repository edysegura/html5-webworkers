import { isWorkerSelected, showResults } from './html.service'
import { heavyOperation } from './labor-task'

function delegateLaborTask() {
  const operationTimes = 1000000000

  showResults()

  isWorkerSelected()
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function useWebWorker(operationTimes) {
  const worker = new Worker('./worker.js')

  worker.addEventListener('message', ({ data }) => {
    showResults(data)
    worker.terminate()
  })

  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  const result = heavyOperation(operationTimes)
  showResults(result)
}

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)
