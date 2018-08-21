import { heavyOperation } from './labor-task.js'

self.addEventListener('message', event => {
  let result = heavyOperation(event.data)
  self.postMessage(result)
})
