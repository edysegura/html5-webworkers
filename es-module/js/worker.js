// import { heavyOperation } from './labor-task.js'

function heavyOperation(operationTimes) {
  let result = 0
  while (operationTimes--) {
    result += Math.random()
  }
  return result
}

self.addEventListener('message', event => {
  let result = heavyOperation(event.data)
  self.postMessage(result)
})
