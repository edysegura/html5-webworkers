const sharedWorker = new SharedWorker('js/shared-worker.js')
const url = new URL(location.href)
const logElement = document.getElementById('log')

sharedWorker.port.postMessage({
  url: url.pathname,
  visibility: document.visibilityState,
})

sharedWorker.port.onmessage = (event) => {
  console.log(event.data)
  logElement.value += event.data.join('\n')
  logElement.scrollTop = logElement.scrollHeight // Auto-scroll to bottom
}
