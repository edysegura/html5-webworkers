import { isWorkerSelected, showResults } from './html.service.js'
import { heavyOperation } from './labor-task.js'
import Worker from './worker.js?worker'

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)

const progressBar = document.getElementById('progressbar')
let progressInterval

function updateProgressBar() {
  let progress = 0
  // Clear any existing interval
  if (progressInterval) {
    clearInterval(progressInterval)
    progressBar.value = 0
  }
  progressInterval = setInterval(() => {
    progress += 5
    progressBar.value = progress
    if (progress >= 100) {
      clearInterval(progressInterval)
      progressBar.value = 0
    }
  }, 500)
}

function delegateLaborTask() {
  let operationTimes = 1000000000
  showResults()
  button.setAttribute('aria-busy', 'true')
  updateProgressBar()
  isWorkerSelected()
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function useWebWorker(operationTimes) {
  const worker = new Worker()
  worker.addEventListener('message', (event) => {
    showResults(event.data)
    clearInterval(progressInterval)
    worker.terminate()
    progressBar.value = 100
    button.removeAttribute('aria-busy')
    console.log('[worker] Worker terminated')
  })
  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  let result = heavyOperation(operationTimes)
  showResults(result)
  button.removeAttribute('aria-busy')
  clearInterval(progressInterval)
  progressBar.value = 100
  console.log('[main] Heavy operation completed')
}
