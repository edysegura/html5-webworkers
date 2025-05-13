import { isWorkerSelected, showResults } from './html.service.js'
import { heavyOperation } from './labor-task.js'

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)

function delegateLaborTask() {
  let operationTimes = 1000000000

  showResults()
  button.setAttribute('aria-busy', 'true')

  isWorkerSelected()
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function useWebWorker(operationTimes) {
  const worker = new Worker('js/worker.js', { type: 'module' })

  worker.addEventListener('message', (event) => {
    showResults(event.data)
    worker.terminate()
    button.removeAttribute('aria-busy')
  })

  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  let result = heavyOperation(operationTimes)
  showResults(result)
  button.removeAttribute('aria-busy')
}
