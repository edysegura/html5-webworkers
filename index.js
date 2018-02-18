
const button = document.querySelector('button')

function delegateHashGeneration() {
    let useWorker = document.querySelector('[name=useWebWorker]').checked

    if (!useWorker) {
        const hashes = generateHashes().join('\n')
        showHashes(hashes, 'without webwork')
    }
    else {
        const worker = new Worker('worker.js')
        worker.addEventListener('message', e => {
            // console.log(e.data)
            showHashes(e.data, 'with webwork')
        })
        worker.postMessage(true)
    }
}

function showHashes(hashes, method) {
    console.log(`Done ${method}!`)
}

button.addEventListener('click', () => {
    delegateHashGeneration()
})

