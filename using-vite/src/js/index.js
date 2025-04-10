import { isWorkerSelected, showResults } from './html.service.js'
import { heavyOperation } from './labor-task.js'

let progressInterval

function updateProgressBar() {
  const progressBar = document.getElementById('processProgress')
  let progress = 0

  // Clear any existing interval
  if (progressInterval) {
    clearInterval(progressInterval)
    progressBar.value = 0
  }

  progressInterval = setInterval(() => {
    progress += 1
    progressBar.value = progress

    if (progress >= 100) {
      clearInterval(progressInterval)
      progressBar.value = 0
    }
  }, 250)
}

function delegateLaborTask() {
  let operationTimes = 1000000000

  showResults()
  updateProgressBar()

  isWorkerSelected()
    ? useWebWorker(operationTimes)
    : useMainThread(operationTimes)
}

function useWebWorker(operationTimes) {
  const worker = new Worker('src/js/worker.js', { type: 'module' })

  worker.addEventListener('message', (event) => {
    showResults(event.data)
    clearInterval(progressInterval)
    document.getElementById('processProgress').value = 100
    worker.terminate()
    console.log('[worker] Worker terminated')
  })

  worker.postMessage(operationTimes)
}

function useMainThread(operationTimes) {
  let result = heavyOperation(operationTimes)
  showResults(result)
  clearInterval(progressInterval)
  document.getElementById('processProgress').value = 100
  console.log('[main] Heavy operation completed')
}

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)
