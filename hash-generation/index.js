'use strict'

function delegateHashGeneration() {
  let useWorker = document.querySelector('[name=useWebWorker]').checked
  if (useWorker) {
    generateWithWebWorker()
  } else {
    generateWithoutWebWorker()
  }
}

function generateWithWebWorker() {
  const method = 'with webwork'
  const worker = new Worker('worker.js')
  console.time(method)
  worker.addEventListener('message', e => {
    // console.log(e.data)
    handleHashes(e.data, method)
  })
  worker.postMessage(true)
}

function generateWithoutWebWorker() {
  const method = 'without webwork'
  console.time(method)
  const hashes = generateHashes().join('\n')
  handleHashes(hashes, method)
}

function handleHashes(hashes, method) {
  console.timeEnd(method)
  console.log(`Done ${method}!`)
}

const button = document.querySelector('button')
button.addEventListener('click', () => {
  delegateHashGeneration()
})
