importScripts('hash-generation.js')

self.addEventListener('message', e => {
    // console.log(e.data)
    self.postMessage(generateHashes().join('<br>'))
})