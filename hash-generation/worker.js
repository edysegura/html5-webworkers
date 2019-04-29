'use strict'

importScripts('hash-generation.js')

self.addEventListener('message', event => {
    console.log(event.data)
    self.postMessage(generateHashes().join('\n'))
})