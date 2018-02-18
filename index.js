function delegateHashGeneration() {
  let useWorker = document.querySelector('[name=useWebWorker]').checked
  if (!useWorker) {
    generateWithoutWebWorker()
  } else {
    generateWithWebWorker()
  }
}

function generateWithWebWorker() {
  const method = 'with webwork'
  console.time(method)
  const worker = new Worker('worker.js')
  worker.addEventListener('message', e => {
    // console.log(e.data)
    showHashes(e.data, method)
  })
  worker.postMessage(true)
}

function generateWithoutWebWorker() {
  const method = 'without webwork'
  console.time(method)
  const hashes = generateHashes().join('\n')
  showHashes(hashes, method)
}

function showHashes(hashes, method) {
  console.timeEnd(method)
  console.log(`Done ${method}!`)
}

const button = document.querySelector('button')
button.addEventListener('click', () => {
  delegateHashGeneration()
})
