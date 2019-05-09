import { heavyOperation } from './labor-task'

self.addEventListener('message', ({ data }) => {
  const result = heavyOperation(data)
  self.postMessage(result)
})
