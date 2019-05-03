'use strict'

function delegateHashGenerator() {
  const useWorker = document.querySelector('[name=useWebWorker]').checked
  useWorker
    ? useWebWorker()
    : useMainThread()
}

function useWebWorker() {
  const method = 'webwork'
  console.time(method)
  const worker = new Worker('worker.js')
  worker.addEventListener('message', event => {
    const hashes = event.data
    hashesHandler(hashes, method)
  })
  worker.postMessage('generate hashes')
}

function useMainThread() {
  const method = 'main thread'
  console.time(method)
  const hashes = generateHashes()
  hashesHandler(hashes, method)
}

function hashesHandler(hashes, method) {
  console.timeEnd(method)
  const numberOfHashes = hashes.length
  console.log(`Done using ${method}! ${numberOfHashes} hashes were generated`)
}

const button = document.querySelector('button')
button.addEventListener('click', () => {
  delegateHashGenerator()
})
