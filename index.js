
const button = document.querySelector('button')

function delegateHashGeneration() {
    let useWorker = document.querySelector('[name=useWebWorker]').checked

    if (!useWorker) {
        const hashes = generateHashes().join('<br>')
        showHashes(hashes)
    } else {
        const worker = new Worker('worker.js')
        worker.addEventListener('message', e => {
            // console.log(e.data)
            showHashes(e.data)
        })
        worker.postMessage(true)
    }
}

function showHashes(hashes) {
    document.querySelector('output').innerText = hashes
}

button.addEventListener('click', () => {
    delegateHashGeneration()
})

