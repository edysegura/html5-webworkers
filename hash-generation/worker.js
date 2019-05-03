'use strict'

importScripts('hash-generation.js')

self.onmessage = () => {
  self.postMessage(generateHashes())
}