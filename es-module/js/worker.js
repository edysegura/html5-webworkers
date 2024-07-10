import { heavyOperation } from './labor-task.js'

self.addEventListener('message', (event) => {
  console.log('[worker] Message received from main thread')
  let result = heavyOperation(event.data)
  self.postMessage(result)
})
