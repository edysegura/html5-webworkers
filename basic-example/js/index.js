function delegateLaborTask() {
  let isWorkerSelected = document.querySelector('[name=useWebWorker]').checked
  isWorkerSelected
    ? useWebWorker()
    : useMainThread();
}

function useWebWorker() {
  const worker = new Worker('js/worker.js')

  worker.addEventListener('message', event => {
    // Receive results from worker thread
    showResults(event.data)
  })

  // Send child process some work
  worker.postMessage(1000000000)
}

function useMainThread() {
  showResults('To be implemented!')
}

function showResults(result) {
  const output = document.getElementById('output')
  output.textContent = `received: ${result}`
}

const button = document.querySelector('button')
button.addEventListener('click', delegateLaborTask)
