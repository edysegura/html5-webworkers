'use strict'

const url = new URL(location.href)
const sharedWorker = new SharedWorker('js/shared-worker.js')
sharedWorker.port.postMessage(url.pathname)

sharedWorker.port.onmessage = (event) => {
  console.log(event.data)
}
