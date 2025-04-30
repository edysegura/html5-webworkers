'use strict'

const url = new URL(location.href)
const sharedWorker = new SharedWorker('js/shared-worker.js')
const logElement = document.getElementById('log')
sharedWorker.port.postMessage(url.pathname)

sharedWorker.port.onmessage = (event) => {
  console.log(event.data)
  logElement.value += event.data.join('\n')
  logElement.scrollTop = logElement.scrollHeight // Auto-scroll to bottom
}
